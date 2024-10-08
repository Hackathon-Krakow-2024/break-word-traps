from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from routes.transcription import get_transcript_and_subtitles
from routes.analyze_text import analyze_text
from routes.prepare_questions import prepare_questions_for_speech

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/transcription")
async def transcription(video_file: UploadFile = File(...)):
    return await get_transcript_and_subtitles(video_file)

@app.post("/analyze")
async def analyze(request: dict):
    return await analyze_text(request["transcription"])

@app.post("/prepare-question")
async def prepare_questions(request: dict):
    return await prepare_questions_for_speech(request["transcription"])
