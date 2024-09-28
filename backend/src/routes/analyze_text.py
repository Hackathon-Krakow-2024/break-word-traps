from text_analysis.fog import fog
from fastapi import HTTPException
from text_analysis.openai import prompt_ai

async def analyze_text(transcription: str):
    try:
        fog_result = fog(transcription)
        prompt_result = prompt_ai(transcription)

        return {**fog_result, **prompt_result}

    except Exception as e:
        raise HTTPException(status_code=400, detail="Something went wrong.")