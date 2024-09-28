from text_analysis.fog import fog
from fastapi import HTTPException

async def analyze_text(transcription: str):
    try:
        fog_result = fog(transcription)

        return {
            "fog_message": fog_result["message"],
            "fog_score": fog_result["fog_score"]
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail="Something went wrong.")