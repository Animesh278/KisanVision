"""
Knowledge Base Retriever — KisanVision RAG System
===================================================
Retrieves evidence-grounded agronomic extension literature using dense FAISS
vector search with TF-IDF fallback.

Features:
  - Vector similarity search (gemini-embedding-001 + FAISS)
  - Keyword/TF-IDF fallback for offline reliability
  - Domain boosting by crop and disease matching
  - Formatted evidence blocks with traceable citations

Author  : KisanVision Senior GenAI Engineering Team
"""

import os
import json
import pickle
import logging
from typing import List, Dict, Any, Optional

import numpy as np

# Load environment
from dotenv import load_dotenv
load_dotenv()

logger = logging.getLogger("rag_retriever")

INDEX_DIR = os.path.join(os.path.dirname(__file__), "index")
CHUNKS_PATH = os.path.join(INDEX_DIR, "rag_chunks.json")
FAISS_PATH = os.path.join(INDEX_DIR, "rag_dense.faiss")
TFIDF_PATH = os.path.join(INDEX_DIR, "rag_tfidf.pkl")


class AgriculturalKnowledgeRetriever:
    """
    Evidence retriever for agricultural extension documents.
    """

    def __init__(self):
        self.chunks: List[Dict[str, Any]] = []
        self.faiss_index = None
        self.tfidf_data = None
        self._load_indexes()

    def _load_indexes(self):
        # 1. Load chunks metadata
        if os.path.exists(CHUNKS_PATH):
            try:
                with open(CHUNKS_PATH, "r", encoding="utf-8") as f:
                    self.chunks = json.load(f)
                logger.info("Loaded %d knowledge base chunks.", len(self.chunks))
            except Exception as e:
                logger.error("Failed loading rag_chunks.json: %s", e)

        # 2. Load FAISS index
        if os.path.exists(FAISS_PATH):
            try:
                import faiss
                self.faiss_index = faiss.read_index(FAISS_PATH)
                logger.info("Loaded dense FAISS index (%d items).", self.faiss_index.ntotal)
            except Exception as e:
                logger.warning("Could not load FAISS index: %s", e)

        # 3. Load TF-IDF index
        if os.path.exists(TFIDF_PATH):
            try:
                with open(TFIDF_PATH, "rb") as f:
                    self.tfidf_data = pickle.load(f)
                logger.info("Loaded TF-IDF offline index.")
            except Exception as e:
                logger.warning("Could not load TF-IDF index: %s", e)

    def retrieve(
        self,
        query: str,
        crop: Optional[str] = None,
        disease_name: Optional[str] = None,
        top_k: int = 3,
    ) -> List[Dict[str, Any]]:
        """
        Retrieves top_k most relevant extension literature chunks for the query.
        """
        if not self.chunks:
            logger.warning("Knowledge base is empty. Re-run smart_system/rag/ingest.py.")
            return []

        search_query = query
        if crop:
            search_query += f" crop:{crop}"
        if disease_name:
            # Clean disease name (e.g., 'Tomato___Early_blight' -> 'Tomato Early blight')
            clean_d = disease_name.replace("___", " ").replace("__", " ").replace("_", " ")
            search_query += f" disease:{clean_d}"

        # Attempt Dense FAISS retrieval first
        results = self._search_dense(search_query, top_k=top_k * 2)

        # Fallback to TF-IDF if dense failed or produced zero hits
        if not results:
            results = self._search_tfidf(search_query, top_k=top_k * 2)

        # Re-rank with domain keyword boosting
        reranked = self._rerank(results, crop=crop, disease_name=disease_name)
        final_top = reranked[:top_k]

        # Format output with citations
        formatted = []
        for r in final_top:
            chunk = r["chunk"]
            citation = f"{chunk['authority']} — {chunk['doc_title']} [{chunk['doc_id']}], {chunk['section']}"
            formatted.append({
                "chunk_id": chunk["chunk_id"],
                "doc_title": chunk["doc_title"],
                "doc_id": chunk["doc_id"],
                "authority": chunk["authority"],
                "section": chunk["section"],
                "crops": chunk.get("crops", []),
                "diseases": chunk.get("diseases", []),
                "similarity_score": round(float(r["score"]), 4),
                "citation": citation,
                "content": chunk["content"],
            })

        return formatted

    def _search_dense(self, query: str, top_k: int = 6) -> List[Dict[str, Any]]:
        if self.faiss_index is None:
            return []

        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            return []

        try:
            import faiss
            from google import genai
            client = genai.Client(api_key=api_key)
            res = client.models.embed_content(
                model="gemini-embedding-001",
                contents=query,
            )
            vec = np.array([res.embeddings[0].values], dtype=np.float32)
            faiss.normalize_L2(vec)

            distances, indices = self.faiss_index.search(vec, min(top_k, len(self.chunks)))
            matches = []
            for score, idx in zip(distances[0], indices[0]):
                if idx >= 0 and idx < len(self.chunks):
                    matches.append({"chunk": self.chunks[idx], "score": float(score)})
            return matches
        except Exception as e:
            logger.warning("Dense search failed: %s. Falling back to TF-IDF.", e)
            return []

    def _search_tfidf(self, query: str, top_k: int = 6) -> List[Dict[str, Any]]:
        if self.tfidf_data is None:
            return []

        try:
            from sklearn.metrics.pairwise import cosine_similarity
            vec = self.tfidf_data["vectorizer"].transform([query])
            sims = cosine_similarity(vec, self.tfidf_data["matrix"])[0]
            top_indices = np.argsort(sims)[::-1][:top_k]

            matches = []
            for idx in top_indices:
                if sims[idx] > 0.01:
                    matches.append({"chunk": self.chunks[idx], "score": float(sims[idx])})
            return matches
        except Exception as e:
            logger.error("TF-IDF search error: %s", e)
            return []

    def _rerank(
        self,
        matches: List[Dict[str, Any]],
        crop: Optional[str] = None,
        disease_name: Optional[str] = None,
    ) -> List[Dict[str, Any]]:
        """
        Boosts similarity score when explicit crop or pathogen matches occur.
        """
        if not crop and not disease_name:
            return matches

        clean_d = (disease_name or "").lower().replace("_", " ")
        clean_c = (crop or "").lower()

        boosted = []
        for item in matches:
            chunk = item["chunk"]
            score = item["score"]
            c_text = chunk["content"].lower()
            sec_text = chunk["section"].lower()

            # Crop boost
            if clean_c and (clean_c in sec_text or any(clean_c in c.lower() for c in chunk.get("crops", []))):
                score += 0.25

            # Disease boost
            d_tokens = [t for t in clean_d.split() if len(t) > 3 and t not in ["leaf", "plant", "crop"]]
            for dt in d_tokens:
                if dt in sec_text or any(dt in d.lower() for d in chunk.get("diseases", [])):
                    score += 0.35
                elif dt in c_text:
                    score += 0.15

            boosted.append({"chunk": chunk, "score": score})

        boosted.sort(key=lambda x: x["score"], reverse=True)
        return boosted


# Global retriever instance
_retriever_instance: Optional[AgriculturalKnowledgeRetriever] = None

def get_retriever() -> AgriculturalKnowledgeRetriever:
    global _retriever_instance
    if _retriever_instance is None:
        _retriever_instance = AgriculturalKnowledgeRetriever()
    return _retriever_instance
