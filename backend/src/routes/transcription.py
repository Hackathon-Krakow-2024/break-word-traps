from transcription.transcription import generate_transcript_from_video
from fastapi import HTTPException

async def get_transcript_and_subtitles(video_file_path: str):
    try:
        transcript = await generate_transcript_from_video(video_file_path)

        return {
            "transcript": transcript["text"],
            "subtitles": transcript["subtitles"],
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail="Something went wrong.")