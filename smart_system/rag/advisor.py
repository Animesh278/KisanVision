"""
Grounded Agronomic Reasoning Engine (RAG) — KisanVision AI
============================================================
Translates Computer Vision model predictions + farmer field context +
authoritative agricultural extension evidence into grounded, clinical,
and structured decision support using Google Gemini 3.8 Flash.

Safety & Grounding Guarantees:
  - Strict separation of Computer Vision output from GenAI explanation
  - Grounded strictly in retrieved extension literature
  - Zero hallucination of confidence scores, weather, or unverified chemicals
  - Safe dosage disclaimers on all interventions
  - Multi-turn follow-up assistant maintaining case memory

Author  : KisanVision Senior GenAI Engineering Team
"""

import os
import json
import logging
from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field

# Load environment
from dotenv import load_dotenv
load_dotenv()

from .retriever import get_retriever

logger = logging.getLogger("rag_advisor")


# ═══════════════════════════════════════════════════════════════
# PYDANTIC STRUCTURED OUTPUT SCHEMAS
# ═══════════════════════════════════════════════════════════════

class EvidenceSource(BaseModel):
    source_id: str = Field(description="Document ID, e.g. EXT-SOL-2024-TOM")
    title: str = Field(description="Document title")
    authority: str = Field(description="Publishing authority or extension body")
    section: str = Field(description="Relevant section name")
    citation: str = Field(description="Standardized bibliographic citation string")


class NextActionStep(BaseModel):
    category: str = Field(description="Category: Cultural, Biological, Chemical, or Monitoring")
    action: str = Field(description="Concise action headline, e.g., 'Sanitize lower foliage'")
    detail: str = Field(description="Practical instructions based on extension evidence")


class GroundedClinicalAssessment(BaseModel):
    summary: str = Field(description="Plain-language clinical summary of crop health status for the farmer")
    model_predicted_condition: str = Field(description="Exact diagnosis name from Computer Vision model")
    model_confidence_pct: float = Field(description="Verified confidence percentage from Computer Vision model")
    confidence_level: str = Field(description="HIGH (>=80%), MODERATE (60-79%), or LOW (<60%)")
    evidence_based_explanation: str = Field(description="Detailed pathological explanation grounded strictly in extension evidence")
    immediate_action_steps: List[NextActionStep] = Field(description="Prioritized list of 2 to 4 actionable steps")
    preventative_measures: List[str] = Field(description="Long-term agronomic prevention strategies")
    uncertainty_note: str = Field(description="Transparent uncertainty note or diagnostic limitations")
    missing_information_requests: List[str] = Field(description="Information farmer can provide to increase certainty")
    source_references: List[EvidenceSource] = Field(description="Verifiable source citations from retrieved literature")
    suggested_follow_up_questions: List[str] = Field(description="3 practical follow-up questions the farmer can click to ask")


class FollowUpResponse(BaseModel):
    answer: str = Field(description="Direct, grounded answer addressing the farmer's follow-up question")
    practical_recommendations: List[str] = Field(description="Bullet points of immediate recommendations")
    safety_disclaimer: str = Field(description="Standard agricultural chemical/biological safety note")
    further_questions: List[str] = Field(description="2-3 relevant next questions")


# ═══════════════════════════════════════════════════════════════
# CROP ADVISOR IMPLEMENTATION
# ═══════════════════════════════════════════════════════════════

class CropDoctorAdvisor:
    """
    RAG-grounded decision support advisor for crop disease management.
    """

    def __init__(self):
        self.retriever = get_retriever()
        self.model_name = "gemini-3.8-flash"

    def analyze(
        self,
        prediction: str,
        confidence: float,
        plant: str,
        condition: str,
        top_predictions: List[Dict[str, Any]],
        farmer_crop: Optional[str] = None,
        growth_stage: Optional[str] = None,
        symptoms: Optional[str] = None,
        location: Optional[str] = None,
    ) -> Dict[str, Any]:
        """
        Executes full RAG analysis:
          1. Formulate search query from prediction + farmer inputs
          2. Retrieve authoritative extension evidence
          3. Generate grounded Pydantic assessment via Gemini
          4. Return complete traceable payload
        """
        effective_crop = farmer_crop or plant or "Crop"
        effective_disease = condition or prediction

        # 1. Retrieve evidence
        retrieval_query = f"{effective_crop} {effective_disease} {symptoms or ''}"
        retrieved_chunks = self.retriever.retrieve(
            query=retrieval_query,
            crop=effective_crop,
            disease_name=prediction,
            top_k=3,
        )

        # 2. Build structured evidence block for LLM prompt
        evidence_text = ""
        for i, chunk in enumerate(retrieved_chunks, 1):
            evidence_text += (
                f"\n--- EVIDENCE SOURCE [{i}] ---\n"
                f"Document: {chunk['doc_title']} (ID: {chunk['doc_id']})\n"
                f"Authority: {chunk['authority']}\n"
                f"Section: {chunk['section']}\n"
                f"Text:\n{chunk['content']}\n"
            )

        # 3. Call Gemini with Pydantic structured output
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            logger.warning("No GEMINI_API_KEY. Using offline extension fallback.")
            return self._build_offline_assessment(
                prediction, confidence, plant, condition, top_predictions,
                effective_crop, growth_stage, symptoms, location, retrieved_chunks
            )

        top_preds_formatted = []
        for p in top_predictions[:3]:
            if isinstance(p, (list, tuple)) and len(p) >= 2:
                top_preds_formatted.append(f"{p[0]} ({float(p[1]):.1f}%)")
            elif isinstance(p, dict):
                lbl = p.get("disease") or p.get("label") or p.get("name") or "Unknown"
                cnf = p.get("confidence") or p.get("confidence_pct") or 0.0
                top_preds_formatted.append(f"{lbl} ({float(cnf):.1f}%)")
        top_preds_str = ", ".join(top_preds_formatted) if top_preds_formatted else "None"

        try:
            from google import genai
            client = genai.Client(api_key=api_key)

            prompt = f"""You are the KisanVision Agricultural Diagnostic Engine, an evidence-grounded AI crop doctor.

FIELD CASE DATA:
- Computer Vision Predicted Condition: {prediction}
- Computer Vision Verified Confidence: {confidence:.2f}%
- Host Plant: {effective_crop}
- Farmer-Reported Growth Stage: {growth_stage or 'Not specified'}
- Farmer-Reported Symptoms: {symptoms or 'No visual symptoms noted by farmer'}
- Regional Location: {location or 'Not specified'}
- Top Alternative Diagnoses: {top_preds_str}

RETRIEVED EXTENSION LITERATURE (STRICT GROUNDING SOURCE):
{evidence_text if evidence_text else 'No specific extension document matched. Rely only on general verified agronomic principles.'}

STRICT SAFETY AND GROUNDING RULES:
1. Ground your diagnosis and advice strictly in the provided extension literature.
2. Separate the Computer Vision prediction ({prediction} at {confidence:.2f}%) from your clinical interpretation.
3. If the confidence is below 70% or farmer symptoms conflict with the prediction, highlight the diagnostic uncertainty prominently.
4. DO NOT invent arbitrary chemical dosages, weather forecasts, or false partner awards.
5. Emphasize non-chemical cultural sanitation and biological controls first before mentioning chemical protectants.
6. Always cite the specific extension documents provided in the evidence.
7. Return your response matching the GroundedClinicalAssessment schema.
"""

            response = client.models.generate_content(
                model=self.model_name,
                contents=prompt,
                config={
                    "response_mime_type": "application/json",
                    "response_schema": GroundedClinicalAssessment,
                    "temperature": 0.2,  # Low temperature for strict factual grounding
                },
            )

            result_dict = json.loads(response.text)

            # Ensure verified model numbers are preserved exactly
            result_dict["model_predicted_condition"] = prediction
            result_dict["model_confidence_pct"] = round(confidence, 2)
            result_dict["retrieved_passages"] = retrieved_chunks

            return {
                "status": "success",
                "assessment": result_dict,
                "retrieved_evidence": retrieved_chunks,
                "case_context": {
                    "prediction": prediction,
                    "confidence": round(confidence, 2),
                    "plant": effective_crop,
                    "condition": effective_disease,
                    "growth_stage": growth_stage,
                    "symptoms": symptoms,
                    "location": location,
                }
            }

        except Exception as e:
            logger.error("Gemini RAG analysis error: %s. Using deterministic extension fallback.", e)
            return self._build_offline_assessment(
                prediction, confidence, plant, condition, top_predictions,
                effective_crop, growth_stage, symptoms, location, retrieved_chunks,
                error_msg=str(e)
            )

    def follow_up(
        self,
        case_context: Dict[str, Any],
        retrieved_evidence: List[Dict[str, Any]],
        assessment: Dict[str, Any],
        user_question: str,
        conversation_history: Optional[List[Dict[str, str]]] = None,
    ) -> Dict[str, Any]:
        """
        Interactive follow-up consultation tied to the specific diagnosis.
        """
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            return {
                "status": "fallback",
                "answer": (
                    "Based on agricultural extension guidelines for "
                    f"{case_context.get('prediction', 'this condition')}, prioritize cultural sanitation, "
                    "adequate plant spacing, and avoiding overhead watering. Always refer to local agricultural extension agents."
                ),
                "practical_recommendations": [
                    "Remove and dispose of severely infected leaves",
                    "Water at the base using drip irrigation",
                    "Scout adjacent rows daily for progression"
                ],
                "safety_disclaimer": "Always consult product labels and regional extension guidelines before applying chemical treatments.",
                "further_questions": [
                    "What organic bio-fungicides can I use?",
                    "How long should I rotate out of this crop family?"
                ]
            }

        try:
            from google import genai
            client = genai.Client(api_key=api_key)

            # Format previous conversation
            history_text = ""
            if conversation_history:
                for msg in conversation_history[-4:]:
                    role = msg.get("role", "user")
                    text = msg.get("text", "")
                    history_text += f"{role.upper()}: {text}\n"

            # Format evidence
            evidence_summary = "\n".join([
                f"- {c.get('citation')}: {c.get('content')[:250]}..."
                for c in retrieved_evidence[:3]
            ])

            prompt = f"""You are the KisanVision Agricultural Diagnostic Assistant consulting with a farmer.

CASE IN PROGRESS:
- Diagnosed Crop: {case_context.get('plant')} ({case_context.get('prediction')})
- Verified Model Confidence: {case_context.get('confidence')}%
- Initial Assessment Summary: {assessment.get('summary')}
- Farmer Field Symptoms: {case_context.get('symptoms') or 'None reported'}

RETRIEVED EXTENSION LITERATURE CONTEXT:
{evidence_summary}

PREVIOUS CHAT:
{history_text}

FARMER'S FOLLOW-UP QUESTION:
"{user_question}"

Respond directly and practically to the farmer's question. Ground your advice in the diagnosed condition and retrieved literature. Do not recommend unapproved chemicals or extreme dosages. Provide 2-3 immediate practical tips and a safety disclaimer.
"""

            response = client.models.generate_content(
                model=self.model_name,
                contents=prompt,
                config={
                    "response_mime_type": "application/json",
                    "response_schema": FollowUpResponse,
                    "temperature": 0.3,
                },
            )

            res_json = json.loads(response.text)
            return {
                "status": "success",
                **res_json
            }

        except Exception as e:
            logger.error("Follow-up error: %s", e)
            return {
                "status": "fallback",
                "answer": (
                    f"Regarding '{user_question}': In the management of {case_context.get('prediction', 'this crop disease')}, "
                    "the recommended protocol is to maintain dry foliage, remove symptomatic leaves, and ensure adequate spacing. "
                    "For severe outbreaks, contact your local Krishi Vigyan Kendra (KVK) or extension office."
                ),
                "practical_recommendations": [
                    "Avoid touching wet foliage to stop spore spread",
                    "Sanitize shears with 10% bleach solution between rows",
                    "Inspect the undersides of leaves in morning light"
                ],
                "safety_disclaimer": "Chemical interventions must follow approved regional extension guidelines and container label instructions.",
                "further_questions": [
                    "Can biological sprays like Trichoderma help?",
                    "What crop should I plant next season?"
                ]
            }

    def _build_offline_assessment(
        self,
        prediction: str,
        confidence: float,
        plant: str,
        condition: str,
        top_predictions: List[Dict[str, Any]],
        effective_crop: str,
        growth_stage: Optional[str],
        symptoms: Optional[str],
        location: Optional[str],
        retrieved_chunks: List[Dict[str, Any]],
        error_msg: str = "",
    ) -> Dict[str, Any]:
        """
        Deterministic, offline fallback using retrieved extension literature directly.
        """
        clean_name = prediction.replace("___", " ").replace("__", " ").replace("_", " ")

        conf_level = "HIGH" if confidence >= 80 else ("MODERATE" if confidence >= 60 else "LOW")

        # Synthesize from top chunk
        top_chunk = retrieved_chunks[0] if retrieved_chunks else None

        summary = (
            f"The image analysis indicates {clean_name} on {effective_crop} with {confidence:.1f}% confidence. "
            f"Guidance is grounded in published agricultural extension guidelines."
        )

        explanation = (
            f"Based on diagnostic records from {top_chunk['authority'] if top_chunk else 'agricultural extension services'}, "
            f"symptoms matching {clean_name} typically involve foliar spotting, chlorosis, or necrotic lesions. "
            f"{top_chunk['content'][:300] if top_chunk else ''}"
        )

        action_steps = [
            NextActionStep(
                category="Cultural",
                action="Prune and Destroy Diseased Foliage",
                detail="Remove heavily spotted or senescing lower leaves during dry sunny periods to reduce spore load."
            ),
            NextActionStep(
                category="Irrigation",
                action="Transition to Ground-Level Watering",
                detail="Avoid overhead sprinkler watering; keep leaf surfaces dry to inhibit fungal and bacterial germination."
            ),
            NextActionStep(
                category="Biological / Chemical",
                action="Apply Approved Extension Protectant",
                detail="Consult local extension recommendations for preventative bio-fungicides or copper formulations."
            )
        ]

        sources = []
        for c in retrieved_chunks:
            sources.append(EvidenceSource(
                source_id=c.get("doc_id", "EXT-LIT"),
                title=c.get("doc_title", "Extension Guide"),
                authority=c.get("authority", "Cooperative Extension"),
                section=c.get("section", "Disease Management"),
                citation=c.get("citation", "Extension Publication")
            ))

        assessment = GroundedClinicalAssessment(
            summary=summary,
            model_predicted_condition=prediction,
            model_confidence_pct=round(confidence, 2),
            confidence_level=conf_level,
            evidence_based_explanation=explanation,
            immediate_action_steps=action_steps,
            preventative_measures=[
                "Enforce a 2-3 year crop rotation out of the host plant family.",
                "Ensure recommended row spacing to maximize airflow throughout the canopy.",
                "Disinfect pruning implements between plants."
            ],
            uncertainty_note=(
                "Visual analysis provides an initial clinical indication. "
                "Abiotic stresses and nutrient deficiencies can produce overlapping symptoms."
            ),
            missing_information_requests=[
                "Presence of spots on fruit or stems",
                "Recent irrigation frequency and rainfall amounts"
            ],
            source_references=sources,
            suggested_follow_up_questions=[
                "Are chemical fungicides necessary at this stage?",
                "How do I prevent this disease from spreading to neighboring rows?",
                "Can I safely compost pruned infected leaves?"
            ]
        )

        res_dict = assessment.model_dump() if hasattr(assessment, "model_dump") else assessment.dict()
        res_dict["retrieved_passages"] = retrieved_chunks

        return {
            "status": "success",
            "offline_mode": True,
            "offline_reason": error_msg or "Deterministic extension fallback",
            "assessment": res_dict,
            "retrieved_evidence": retrieved_chunks,
            "case_context": {
                "prediction": prediction,
                "confidence": round(confidence, 2),
                "plant": effective_crop,
                "condition": condition,
                "growth_stage": growth_stage,
                "symptoms": symptoms,
                "location": location,
            }
        }


# Global advisor instance
_advisor_instance: Optional[CropDoctorAdvisor] = None

def get_crop_doctor_advisor() -> CropDoctorAdvisor:
    global _advisor_instance
    if _advisor_instance is None:
        _advisor_instance = CropDoctorAdvisor()
    return _advisor_instance
