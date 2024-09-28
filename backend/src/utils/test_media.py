import pytest
from fastapi import UploadFile
from io import BytesIO
from unittest.mock import patch, MagicMock
from utils.media import create_temp_audio_file, save_upload_file_to_temp, get_audio_from_video, format_timestamp_for_vtt, create_vtt_string


@pytest.mark.asyncio
async def test_create_temp_audio_file():
    temp_audio_file = await create_temp_audio_file()
    assert temp_audio_file.endswith(".wav")

@pytest.mark.asyncio
async def test_save_upload_file_to_temp():
    file_content = b"test video content"
    upload_file = UploadFile(filename="test.mp4", file=BytesIO(file_content))

    temp_video_file = await save_upload_file_to_temp(upload_file)
    assert temp_video_file.endswith(".mp4")

    with open(temp_video_file, "rb") as f:
        assert f.read() == file_content

@pytest.mark.asyncio
@patch("utils.media.mp.VideoFileClip")
async def test_get_audio_from_video(mock_video_file_clip):
    file_content = b"test video content"
    upload_file = UploadFile(filename="test.mp4", file=BytesIO(file_content))

    mock_audio = MagicMock()
    mock_video_file_clip.return_value.audio = mock_audio

    temp_audio_file = await get_audio_from_video(upload_file)
    assert temp_audio_file.endswith(".wav")
    mock_audio.write_audiofile.assert_called_once_with(temp_audio_file)

@pytest.mark.asyncio
@patch("utils.media.mp.VideoFileClip", side_effect=Exception("Mocked exception"))
async def test_get_audio_from_video_exception(_):
    file_content = b"test video content"
    upload_file = UploadFile(filename="test.mp4", file=BytesIO(file_content))

    with pytest.raises(RuntimeError) as excinfo:
        await get_audio_from_video(upload_file)

    assert "An error occurred while processing the video: Mocked exception" in str(excinfo.value)

def test_format_timestamp_for_vtt():
    assert format_timestamp_for_vtt(0) == "00:00.000"
    assert format_timestamp_for_vtt(1.5) == "00:01.500"
    assert format_timestamp_for_vtt(61.5) == "01:01.500"
    assert format_timestamp_for_vtt(3661.5) == "61:01.500"

def test_create_vtt_string():
    data = [
        {'timestamp': (0, 1.5), 'text': 'Hello'},
        {'timestamp': (1.5, 3), 'text': 'World'}
    ]
    expected_vtt = (
        "WEBVTT\n\n"
        "00:00.000 --> 00:01.500\nHello\n\n"
        "00:01.500 --> 00:03.000\nWorld"
    )
    assert create_vtt_string(data) == expected_vtt

    data = []
    expected_vtt = "WEBVTT"
    assert create_vtt_string(data) == expected_vtt
