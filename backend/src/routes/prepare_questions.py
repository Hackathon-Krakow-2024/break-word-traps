from text_analysis.fog import fog
from fastapi import HTTPException
from text_analysis.openai import prepare_questions_prompt_ai

async def prepare_questions_for_speech(transcription: str):
    try:
        prompt_result = prepare_questions_prompt_ai(transcription)

        return prompt_result

    except Exception as e:
        print("Error in analyze_text:", e)
        raise HTTPException(status_code=400, detail="Something went wrong.")
