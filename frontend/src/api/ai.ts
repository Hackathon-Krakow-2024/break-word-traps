import { TranscriptionAnalysis } from '../components/Results'
import { TranscriptionResponse } from '../models/Transcription'

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7860'

export const getTranscriptAndSubtitles = async (videoFile: File): Promise<TranscriptionResponse> => {
  try {
    const formData = new FormData()

    formData.append('video_file', videoFile)
    const response = await fetch(`${API}/transcription`, {
      method: 'POST',
      body: formData,
    })
    const data = await response.json()

    return data
  } catch (e) {
    console.log(e)
    return { text: '', subtitles: '' }
  }
}

export const analyzeText = async (transcription: string): Promise<TranscriptionAnalysis> => {
  try {
    const response = await fetch(`${API}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ transcription }),
    })
    const data = await response.json()

    return data
  } catch (e) {
    console.log(e)
    return {
      fog_message: '',
      fog_score: 0,
      sentiment: {
        emotions: {
          kind: '',
          score: 0,
        },
        hateSpeech: false,
      },
      targetGroup: '',
      grammarScore: 0,
      tooManyNumbers: false,
      hasJargon: false,
      hasForeignLanguage: false,
      hasNonExistentWords: false,
      isPassive: false,
      tooManyRepetitions: false,
      hasTopicChange: false,
    }
  }
}
