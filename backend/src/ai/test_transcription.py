import pytest
from unittest.mock import patch, AsyncMock
from ai.transcription import generate_transcript_from_video
import torch

@pytest.mark.asyncio
@patch("ai.transcription.get_audio_from_video", new_callable=AsyncMock)
@patch("ai.transcription.pipeline")
@patch("ai.transcription.create_vtt_string")
async def test_generate_transcript_from_video_success(mock_create_vtt_string, mock_pipeline, mock_get_audio_from_video):
  mock_get_audio_from_video.return_value = "audio_file_path"
  mock_transcriber = mock_pipeline.return_value
  mock_transcriber.return_value = {
    "text": "transcribed text",
    "chunks": [{'timestamp': (0.0, 3.240), 'text': 'test'}, {'timestamp': (3.240, 6.480), 'text': 'test2'}]
  }
  mock_create_vtt_string.return_value = "vtt_string"

  result = await generate_transcript_from_video("video_file_path")

  assert result == {
    "text": "transcribed text",
    "subtitles": "vtt_string"
  }
  mock_get_audio_from_video.assert_called_once_with("video_file_path")
  mock_pipeline.assert_called_once_with("automatic-speech-recognition", model="openai/whisper-medium", chunk_length_s=30, device="cuda:0" if torch.cuda.is_available() else "cpu", return_timestamps=True)
  mock_create_vtt_string.assert_called_once_with([{'timestamp': (0.0, 3.240), 'text': 'test'}, {'timestamp': (3.240, 6.480), 'text': 'test2'}])

@pytest.mark.asyncio
@patch("ai.transcription.get_audio_from_video", new_callable=AsyncMock)
async def test_generate_transcript_from_video_file_not_found(mock_get_audio_from_video):
  mock_get_audio_from_video.side_effect = FileNotFoundError("File not found")

  result = await generate_transcript_from_video("video_file_path")

  assert result == "File not found: File not found"

@pytest.mark.asyncio
@patch("ai.transcription.get_audio_from_video", new_callable=AsyncMock)
async def test_generate_transcript_from_video_value_error(mock_get_audio_from_video):
  mock_get_audio_from_video.side_effect = ValueError("Invalid input")

  result = await generate_transcript_from_video("video_file_path")

  assert result == "Input error: Invalid input"

@pytest.mark.asyncio
@patch("ai.transcription.get_audio_from_video", new_callable=AsyncMock)
@patch("ai.transcription.pipeline")
async def test_generate_transcript_from_video_runtime_error(mock_pipeline, mock_get_audio_from_video):
  mock_get_audio_from_video.return_value = "audio_file_path"
  mock_pipeline.side_effect = RuntimeError("Runtime error")

  result = await generate_transcript_from_video("video_file_path")

  assert result == "Runtime error: Runtime error"

@pytest.mark.asyncio
@patch("ai.transcription.get_audio_from_video", new_callable=AsyncMock)
@patch("ai.transcription.pipeline")
async def test_generate_transcript_from_video_unexpected_error(mock_pipeline, mock_get_audio_from_video):
  mock_get_audio_from_video.return_value = "audio_file_path"
  mock_pipeline.side_effect = Exception("Unexpected error")

  result = await generate_transcript_from_video("video_file_path")

  assert result == "An unexpected error occurred: Unexpected error"