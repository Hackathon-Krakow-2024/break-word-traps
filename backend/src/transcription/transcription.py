from transformers import pipeline
from utils.media import get_audio_from_video, create_vtt_string
import torch

device = "cuda:0" if torch.cuda.is_available() else "cpu"

model_name = "openai/whisper-medium"

async def generate_transcript_from_video(video_file_path: str) -> dict:
    try:
        audio_file_path = await get_audio_from_video(video_file_path)
        transcriber = pipeline("automatic-speech-recognition", model=model_name, chunk_length_s=30, device=device, return_timestamps=True)
        audio_transcript = transcriber(audio_file_path, generate_kwargs={"language": "pl", "task": "transcribe", "temperature": 0.0, })
        subtitles = create_vtt_string(audio_transcript["chunks"])

        return {
            "text": audio_transcript["text"],
            "subtitles": subtitles
        }

    except ValueError as ve:
        return f"Input error: {ve}"
    except FileNotFoundError as fnf_error:
        return f"File not found: {fnf_error}"
    except RuntimeError as runtime_error:
        return f"Runtime error: {runtime_error}"
    except Exception as e:
        return f"An unexpected error occurred: {str(e)}"