"""
Knowledge Base Ingestion Script — KisanVision RAG System
==========================================================
Processes verified agricultural extension documents, extracts semantic chunks,
attaches source metadata, generates vector embeddings, and builds a FAISS index.

Outputs:
  - smart_system/rag/index/rag_chunks.json       (Chunk metadata and text)
  - smart_system/rag/index/rag_dense.faiss        (FAISS index of Gemini embeddings)
  - smart_system/rag/index/rag_tfidf.pkl          (Offline fallback TF-IDF vectorizer)

Author  : KisanVision Senior GenAI Engineering Team
"""

import os
import re
import json
import pickle
import logging
from typing import List, Dict, Any

import numpy as np

# Load environment
from dotenv import load_dotenv
load_dotenv()

logging.basicConfig(level=logging.INFO, format="[%(levelname)s] %(message)s")
logger = logging.getLogger("rag_ingest")

DOCS_DIR = os.path.join(os.path.dirname(__file__), "documents")
INDEX_DIR = os.path.join(os.path.dirname(__file__), "index")
os.makedirs(INDEX_DIR, exist_ok=True)


def parse_markdown_document(filepath: str) -> List[Dict[str, Any]]:
    """
    Parses an extension markdown file into structured sections with metadata.
    """
    with open(filepath, "r", encoding="utf-8") as f:
        text = f.read()

    filename = os.path.basename(filepath)
    lines = text.split("\n")

    doc_title = "Agricultural Extension Guide"
    authority = "Cooperative Extension Services"
    doc_id = filename

    # Parse header metadata
    for line in lines[:15]:
        if line.startswith("# "):
            doc_title = line.replace("# ", "").strip()
        elif "**Authority**:" in line:
            authority = line.split("**Authority**:")[1].strip()
        elif "**Document Identifier**:" in line:
            doc_id = line.split("**Document Identifier**:")[1].strip()

    # Split by markdown ## Section headers
    sections = re.split(r"\n##\s+", text)
    chunks = []

    for section in sections:
        if not section.strip() or section.startswith("# "):
            continue

        sec_lines = section.strip().split("\n")
        sec_title = sec_lines[0].strip()
        sec_body = "\n".join(sec_lines[1:]).strip()

        # Identify target crops and diseases from section title
        crops = []
        for c in ["Tomato", "Potato", "Corn", "Maize", "Rice", "Apple", "Grape", "Pepper", "Squash", "Cherry"]:
            if c.lower() in sec_title.lower() or c.lower() in sec_body[:200].lower():
                crops.append(c)

        diseases = []
        for d in ["Early Blight", "Late Blight", "Bacterial Spot", "Yellow Leaf Curl", "Northern Leaf Blight",
                  "Common Rust", "Bacterial Leaf Blight", "Blast", "Scab", "Powdery Mildew", "Leaf Mold",
                  "Septoria"]:
            if d.lower() in sec_title.lower() or d.lower() in sec_body[:200].lower():
                diseases.append(d)

        # If section is lengthy, split into smaller sub-chunks
        subsections = re.split(r"\n###\s+", sec_body)
        if len(subsections) > 1:
            for sub in subsections:
                if not sub.strip():
                    continue
                sub_lines = sub.strip().split("\n")
                sub_title = f"{sec_title} — {sub_lines[0].strip()}"
                sub_content = "\n".join(sub_lines[1:]).strip()
                chunks.append({
                    "doc_title": doc_title,
                    "doc_id": doc_id,
                    "authority": authority,
                    "section": sub_title,
                    "crops": list(set(crops)),
                    "diseases": list(set(diseases)),
                    "content": f"### {sub_title}\n{sub_content}",
                })
        else:
            chunks.append({
                "doc_title": doc_title,
                "doc_id": doc_id,
                "authority": authority,
                "section": sec_title,
                "crops": list(set(crops)),
                "diseases": list(set(diseases)),
                "content": f"## {sec_title}\n{sec_body}",
            })

    return chunks


def build_faiss_and_tfidf_index():
    logger.info("Scanning documents directory: %s", DOCS_DIR)
    all_chunks = []

    for filename in sorted(os.listdir(DOCS_DIR)):
        if filename.endswith(".md"):
            filepath = os.path.join(DOCS_DIR, filename)
            logger.info("Parsing document: %s", filename)
            doc_chunks = parse_markdown_document(filepath)
            all_chunks.extend(doc_chunks)

    # Assign IDs
    for idx, c in enumerate(all_chunks):
        c["chunk_id"] = idx

    logger.info("Extracted %d knowledge base chunks from extension literature.", len(all_chunks))

    # Save chunks JSON
    chunks_path = os.path.join(INDEX_DIR, "rag_chunks.json")
    with open(chunks_path, "w", encoding="utf-8") as f:
        json.dump(all_chunks, f, indent=2)
    logger.info("Saved chunk metadata to: %s", chunks_path)

    # Build TF-IDF vectorizer (offline fallback)
    logger.info("Building TF-IDF offline index...")
    from sklearn.feature_extraction.text import TfidfVectorizer
    corpus = [f"{c['section']} {c['content']} {' '.join(c['crops'])} {' '.join(c['diseases'])}" for c in all_chunks]
    tfidf = TfidfVectorizer(stop_words="english", ngram_range=(1, 2))
    tfidf_matrix = tfidf.fit_transform(corpus)

    tfidf_path = os.path.join(INDEX_DIR, "rag_tfidf.pkl")
    with open(tfidf_path, "wb") as f:
        pickle.dump({"vectorizer": tfidf, "matrix": tfidf_matrix}, f)
    logger.info("Saved TF-IDF fallback to: %s", tfidf_path)

    # Build dense embeddings with Gemini
    api_key = os.getenv("GEMINI_API_KEY")
    dense_embeddings = []
    has_dense = False

    if api_key:
        try:
            from google import genai
            client = genai.Client(api_key=api_key)
            logger.info("Generating Gemini dense embeddings with gemini-embedding-001...")

            for i, c in enumerate(all_chunks):
                # Searchable text
                text_to_embed = f"{c['doc_title']} - {c['section']}\nCrops: {', '.join(c['crops'])}\nDiseases: {', '.join(c['diseases'])}\n{c['content']}"
                res = client.models.embed_content(
                    model="gemini-embedding-001",
                    contents=text_to_embed,
                )
                vec = res.embeddings[0].values
                dense_embeddings.append(vec)
                if (i + 1) % 5 == 0 or (i + 1) == len(all_chunks):
                    logger.info("Embedded %d / %d chunks", i + 1, len(all_chunks))

            dense_array = np.array(dense_embeddings, dtype=np.float32)

            # Build FAISS index
            import faiss
            dim = dense_array.shape[1]
            # Normalize vectors for cosine similarity
            faiss.normalize_L2(dense_array)
            index = faiss.IndexFlatIP(dim)
            index.add(dense_array)

            faiss_path = os.path.join(INDEX_DIR, "rag_dense.faiss")
            faiss.write_index(index, faiss_path)
            logger.info("Saved FAISS index with %d vectors (dimension: %d) to: %s", index.ntotal, dim, faiss_path)
            has_dense = True
        except Exception as e:
            logger.warning("Dense embedding generation encountered an issue: %s. TF-IDF will remain available.", e)
    else:
        logger.warning("No GEMINI_API_KEY detected. Dense FAISS index skipped; TF-IDF index ready.")

    print("=" * 60)
    print("SUCCESS: RAG KNOWLEDGE BASE INGESTION COMPLETE")
    print(f"   Chunks Indexed: {len(all_chunks)}")
    print(f"   TF-IDF Ready  : Yes")
    print(f"   Dense FAISS   : {'Yes' if has_dense else 'No'}")
    print("=" * 60)


if __name__ == "__main__":
    build_faiss_and_tfidf_index()
