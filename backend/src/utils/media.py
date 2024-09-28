import tempfile
import moviepy.editor as mp
from fastapi import UploadFile


def format_timestamp_for_vtt(seconds):
    millis = int((seconds - int(seconds)) * 1000)
    seconds = int(seconds)
    minutes = seconds // 60
    seconds %= 60
    return f"{minutes:02}:{seconds:02}.{millis:03}"

def create_vtt_string(data) -> str:
    vtt_content = "WEBVTT\n\n"
    for entry in data:
        start_time = format_timestamp_for_vtt(entry['timestamp'][0])
        end_time = format_timestamp_for_vtt(entry['timestamp'][1])
        text = entry['text'].strip()
        vtt_content += f"{start_time} --> {end_time}\n{text}\n\n"

    return vtt_content.strip()


async def create_temp_audio_file() -> str:
    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_file:
        return temp_file.name

async def save_upload_file_to_temp(upload_file: UploadFile) -> str:
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as temp_file:
        temp_file.write(await upload_file.read())
        return temp_file.name

async def get_audio_from_video(video_file: UploadFile) -> str:
    try:
        generated_audio_file_path = await create_temp_audio_file()
        video_file_path = await save_upload_file_to_temp(video_file)
        video = mp.VideoFileClip(video_file_path)
        video.audio.write_audiofile(generated_audio_file_path)

        return generated_audio_file_path

    except Exception as e:
        raise RuntimeError(f"An error occurred while processing the video: {str(e)}")