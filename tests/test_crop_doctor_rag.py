"""
KisanVision AI — Comprehensive Test Suite (Presentation Polish)
================================================================
Covers:
  1. Disease inference integration with PyTorch model
  2. RAG knowledge base integrity and metadata traceability
  3. FAISS vector retrieval & TF-IDF offline fallback
  4. Pydantic structured output schema validation
  5. Low-confidence guards and uncertainty handling
  6. API endpoints (/api/crop-doctor/samples, /analyze, /follow-up)
"""

import os
import sys
import json
import unittest

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from fastapi.testclient import TestClient
from pydantic import ValidationError

from smart_system.disease_engine import DiseaseEngine
from smart_system.rag.retriever import get_retriever, AgriculturalKnowledgeRetriever
from smart_system.rag.advisor import (
    get_crop_doctor_advisor,
    GroundedClinicalAssessment,
    EvidenceSource,
    NextActionStep,
    FollowUpResponse
)
from ai_api.api import app, _load_disease


class TestCropDoctorRAG(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        _load_disease()
        cls.client = TestClient(app)
        cls.retriever = get_retriever()
        cls.advisor = get_crop_doctor_advisor()

    def test_01_disease_inference_integration(self):
        """Verifies PyTorch disease model loads and outputs structured prediction."""
        engine = DiseaseEngine()
        loaded = engine.load()
        self.assertTrue(loaded, "DiseaseEngine model failed to load.")
        self.assertGreater(len(engine.class_names), 0, "Class names list is empty.")

        # Test inference with sample image
        sample_path = os.path.join(PROJECT_ROOT, "samples", "tomato_early_blight.jpg")
        self.assertTrue(os.path.exists(sample_path), f"Sample image missing at {sample_path}")

        res = engine.predict(sample_path, top_k=5)
        self.assertTrue(res.get("success"), f"Prediction failed: {res.get('error')}")
        self.assertIn("Tomato", res.get("disease_name"))
        self.assertGreaterEqual(res.get("confidence", 0), 50.0, "Confidence is unexpectedly low.")
        self.assertGreaterEqual(len(res.get("top_predictions", [])), 3, "Top predictions list should have >=3 items.")

    def test_02_rag_knowledge_base_integrity(self):
        """Verifies the ingested knowledge base contains required metadata."""
        chunks_file = os.path.join(PROJECT_ROOT, "smart_system", "rag", "index", "rag_chunks.json")
        self.assertTrue(os.path.exists(chunks_file), "rag_chunks.json does not exist. Run ingest.py.")

        with open(chunks_file, "r", encoding="utf-8") as f:
            chunks = json.load(f)

        self.assertGreater(len(chunks), 15, "Knowledge base should contain at least 15 chunks.")
        
        sample_chunk = chunks[0]
        required_keys = ["doc_title", "doc_id", "authority", "section", "content", "chunk_id"]
        for key in required_keys:
            self.assertIn(key, sample_chunk, f"Chunk missing required key: {key}")

    def test_03_rag_retrieval_and_source_metadata(self):
        """Verifies retrieval returns relevant chunks with bibliographic citations."""
        results = self.retriever.retrieve(
            query="dark brown concentric rings target board lesions on lower leaves",
            crop="Tomato",
            disease_name="Tomato___Early_blight",
            top_k=3
        )
        self.assertGreaterEqual(len(results), 1, "RAG retriever returned 0 results.")
        
        top = results[0]
        self.assertIn("citation", top)
        self.assertIn("similarity_score", top)
        self.assertGreater(top["similarity_score"], 0.0)
        self.assertTrue("Alternaria" in top["content"] or "Early Blight" in top["section"] or "Tomato" in top["doc_title"])

    def test_04_pydantic_schema_validation(self):
        """Verifies the Pydantic structured output models validate correctly."""
        source = EvidenceSource(
            source_id="EXT-SOL-2024-TOM",
            title="Tomato Extension Manual",
            authority="State Extension Services",
            section="Early Blight Management",
            citation="Extension IPM Guide [EXT-SOL-2024-TOM], Section 1"
        )
        self.assertEqual(source.source_id, "EXT-SOL-2024-TOM")

        step = NextActionStep(
            category="Cultural",
            action="Prune lower foliage",
            detail="Remove spotted lower leaves during dry weather."
        )
        self.assertEqual(step.category, "Cultural")

        assessment = GroundedClinicalAssessment(
            summary="Tomato Early Blight detected with high confidence.",
            model_predicted_condition="Tomato___Early_blight",
            model_confidence_pct=98.66,
            confidence_level="HIGH",
            evidence_based_explanation="Characteristic concentric rings on lower leaves.",
            immediate_action_steps=[step],
            preventative_measures=["Crop rotation for 2-3 years."],
            uncertainty_note="Visual symptoms strongly match; abiotic heat stress absent.",
            missing_information_requests=[],
            source_references=[source],
            suggested_follow_up_questions=["Can I apply copper fungicide?"]
        )
        self.assertEqual(assessment.confidence_level, "HIGH")
        self.assertEqual(len(assessment.source_references), 1)

    def test_05_offline_fallback_and_uncertainty_guard(self):
        """Verifies deterministic fallback works when API is offline and handles low confidence."""
        # Test offline synthesis
        fake_top = [("Tomato___Early_blight", 55.0), ("Tomato___Late_blight", 30.0)]
        offline_res = self.advisor._build_offline_assessment(
            prediction="Tomato___Early_blight",
            confidence=55.0,
            plant="Tomato",
            condition="Early blight",
            top_predictions=fake_top,
            effective_crop="Tomato",
            growth_stage="Vegetative",
            symptoms="Slight yellowing",
            location="Nashik",
            retrieved_chunks=self.retriever.chunks[:2]
        )
        self.assertTrue(offline_res.get("offline_mode"))
        assessment = offline_res.get("assessment", {})
        self.assertEqual(assessment.get("confidence_level"), "LOW")
        self.assertIn("uncertainty_note", assessment)

    def test_06_crop_doctor_samples_endpoint(self):
        """Verifies GET /api/crop-doctor/samples returns preset samples."""
        res = self.client.get("/api/crop-doctor/samples")
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data.get("status"), "success")
        samples = data.get("samples", [])
        self.assertGreaterEqual(len(samples), 3, "At least 3 demo samples must be configured.")
        
        # Verify first sample has required demo attributes
        s0 = samples[0]
        self.assertIn("id", s0)
        self.assertIn("title", s0)
        self.assertIn("crop", s0)
        self.assertIn("filename", s0)

    def test_07_crop_doctor_analyze_endpoint(self):
        """Verifies POST /api/crop-doctor/analyze executes full pipeline."""
        res = self.client.post("/api/crop-doctor/analyze", data={
            "sample_id": "tomato_early_blight",
            "crop": "Tomato",
            "growth_stage": "Fruit Set",
            "symptoms": "Dark concentric rings on lower leaves",
            "location": "Nashik, Maharashtra"
        })
        self.assertEqual(res.status_code, 200, f"Analyze endpoint returned {res.status_code}: {res.text}")
        data = res.json()
        self.assertEqual(data.get("status"), "success")
        self.assertIn("prediction", data)
        self.assertIn("confidence", data)
        self.assertIn("assessment", data)
        self.assertIn("retrieved_evidence", data)
        self.assertGreater(len(data.get("retrieved_evidence", [])), 0)

    def test_08_crop_doctor_follow_up_endpoint(self):
        """Verifies POST /api/crop-doctor/follow-up answers grounded context questions."""
        # Use case context from sample
        case_context = {
            "prediction": "Tomato___Early_blight",
            "confidence": 98.66,
            "plant": "Tomato",
            "condition": "Early blight",
            "symptoms": "Concentric rings"
        }
        assessment = {
            "summary": "Early Blight diagnosed with 98.66% confidence."
        }
        retrieved = self.retriever.retrieve(query="Tomato Early Blight", crop="Tomato", top_k=2)

        res = self.client.post("/api/crop-doctor/follow-up", json={
            "case_context": case_context,
            "retrieved_evidence": retrieved,
            "assessment": assessment,
            "question": "Can I spray copper fungicide tomorrow morning?",
            "history": []
        })
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertTrue(bool(data.get("answer")), "Follow-up response answer is empty.")
        self.assertIn("practical_recommendations", data)


if __name__ == "__main__":
    unittest.main()
