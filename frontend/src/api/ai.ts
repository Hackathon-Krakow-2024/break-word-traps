import { TranscriptionResponse } from '../models/Transcription'

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7860'

export const predict = async (videoFile: File): Promise<TranscriptionResponse> => {
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
    return { transcript: '', subtitles: '' }
  }
}
