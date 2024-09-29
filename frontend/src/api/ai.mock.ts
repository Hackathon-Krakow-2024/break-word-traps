import { TranscriptionAnalysis, TranscriptionResponse } from '../models/Transcription'


export const getTranscriptAndSubtitles = async (videoFile: File): Promise<TranscriptionResponse> => {
  return Promise.resolve(
    {"transcript":" Dla nas to jest bardzo ważne, żebyśmy w stanie zrozumieć, że w tej chwili, że w tej chwili, że w tej chwili, że w tej chwili, że w tej chwili, że w tej chwili, że w tej chwili, że w tej chwili, że w tej chwili, że w tej chwili, że w tej chwili, że w tej chwili, że w tej chwili, że w tej chwili, że w tej chwili, że w tej chwili, że w tej chwili, że w tej chwili, że w tej chwili, że w tej chwili, że w tej chwili,","subtitles":"WEBVTT\n\n00:00.000 --> 00:05.000\nDla nas to jest bardzo ważne, żebyśmy w stanie zrozumieć, że w tej chwili,\n\n00:05.000 --> 00:10.000\nże w tej chwili, że w tej chwili, że w tej chwili, że w tej chwili, że w tej chwili,\n\n00:10.000 --> 00:15.000\nże w tej chwili, że w tej chwili, że w tej chwili, że w tej chwili, że w tej chwili,\n\n00:15.000 --> 00:20.000\nże w tej chwili, że w tej chwili, że w tej chwili, że w tej chwili, że w tej chwili,\n\n00:20.000 --> 00:25.000\nże w tej chwili, że w tej chwili, że w tej chwili, że w tej chwili, że w tej chwili,"}
  )
}

export const analyzeText = async (transcription: string): Promise<TranscriptionAnalysis> => {
  return {"fog_message":"Wypowiedź jest trudna do zrozumienia.","fog_score":37.6,"sentiment":{"emotions":{"kind":"neutral","score":5.0},"hateSpeech":false},"targetGroup":"dorośli, średnie/wyższe wykształcenie","grammarScore":7.5,"tooManyNumbers":false,"hasJargon":false,"hasForeignLanguage":false,"hasNonExistentWords":false,"isPassive":false,"tooManyRepetitions":true,"hasTopicChange":false}
}

export async function prepareQuestions(transcription: string): Promise<string[]> {
  return Promise.resolve([
    "Do kogo skierowana jest oferta?",
    "Jakie możliwości dają obligacje oszczędnościowe?",
    "Na jaki okres można lokować oszczędności przy użyciu obligacji oszczędnościowych?",
    "Jaki jest maksymalny okres lokowania oszczędności w standardowej ofercie programu 800 plus?",
    "Czy oszczędności można pomnażać dłużej niż przez 10 lat?",
    "Jaki jest maksymalny okres pomnażania oszczędności w ramach standardowej oferty programu 800 plus?",
    "Czy istnieje możliwość realizacji indywidualnych planów oszczędzania?",
    "Czy oferta obligacji jest elastyczna?",
    "Jakie korzyści daje realizacja indywidualnych planów oszczędzania?",
    "Jakie są dostępne opcje wyboru obligacji w ofercie?"
  ])
}
