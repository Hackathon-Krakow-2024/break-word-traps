from text_analysis.fog import fog
from fastapi import HTTPException
from text_analysis.openai import prompt_ai

async def analyze_text(transcription: str):
    try:
        fog_result = fog(transcription)
        result = prompt_ai(transcription)

        return result

    except Exception as e:
        raise HTTPException(status_code=400, detail="Something went wrong.")