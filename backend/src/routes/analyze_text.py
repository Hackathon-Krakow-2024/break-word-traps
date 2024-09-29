from text_analysis.fog import fog
from fastapi import HTTPException
from text_analysis.openai import analyze_transcription_prompt_ai

async def analyze_text(transcription: str):
    try:
        fog_result = fog(transcription)
        prompt_result = analyze_transcription_prompt_ai(transcription)

        return {**fog_result, **prompt_result}

    except Exception as e:
        print("Error in analyze_text:", e)
        raise HTTPException(status_code=400, detail="Something went wrong.")