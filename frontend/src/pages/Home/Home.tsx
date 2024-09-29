import { Gauge } from '@mui/x-charts/Gauge'
import { useEffect, useState } from 'react'

import { analyzeText, getTranscriptAndSubtitles, prepareQuestions } from '../../api/ai'
import { TranscriptionAnalysis, TranscriptionResponse } from '../../models/Transcription'
import { Video } from './Video'
import VideoUpload from '../../components/VideoUpload'
import VideoActions from '../../components/VideoActions'
import { ErrorList } from '../../components/ErrorList'
import QuestionList from '../../components/QuestionList'
// import LoadingIndicator from '../../components/LoadingIndicator'

const emptyState = {
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

export const Home = () => {
  const [transcription, setTranscription] = useState<TranscriptionResponse>({
    transcript: '',
    subtitles: '',
  })
  const [transcriptionAnalysis, setTranscriptionAnalysis] = useState<TranscriptionAnalysis>(emptyState)
  const [questions, setQuestions] = useState<string[]>([])

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)

  const onDrop = (acceptedFiles: File[]) => {
    const videoFile = acceptedFiles[0]
    setVideo(videoFile)
  }

  const [video, setVideo] = useState<File | null>(null)

  useEffect(() => {
    setIsButtonDisabled(!video)
    setTranscription({
      transcript: '',
      subtitles: '',
    })
    setTranscriptionAnalysis(emptyState)
    setQuestions([])
  }, [video])

  const handleVerifyVideo = async () => {
    if (!video) return
    setIsButtonDisabled(true)
    console.log(isLoading)

    try {
      setIsLoading(true)
      const result = await getTranscriptAndSubtitles(video)
      setTranscription(result)
      const analysis = await analyzeText(result.transcript)
      setTranscriptionAnalysis(analysis)
      const questions = await prepareQuestions(result.transcript)
      setQuestions(questions)
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='grid grid-cols-1 grid-rows-2 gap-4 bg-zinc-100 p-4 lg:grid-cols-2'>
      <div className='flex flex-col items-center'>
        <div className='max-h-[600px] w-full'>
          <VideoUpload handleUploadVideo={onDrop} />
          <Video videoFile={video} subtitles={transcription.subtitles} />
        </div>
        <VideoActions handleVerifyVideo={handleVerifyVideo} isButtonDisabled={isButtonDisabled} />
      </div>
      <div className='flex flex-col items-center'>
        <Gauge width={100} height={100} value={60} />
        <Gauge width={100} height={100} value={60} />
        <Gauge width={100} height={100} value={60} />
      </div>
      <div>
        <div className='flex flex-col items-center'>
          <h2 className='mb-2 text-lg font-medium'>Wyniki analizy</h2>
          <p className='m-3 rounded-xl border-2 border-blue-300 bg-blue-200 p-3 text-sm text-gray-900'>
            {transcription.transcript}
          </p>
          <QuestionList questions={questions} />
        </div>
      </div>
      <div>
        <ErrorList transcriptionAnalysis={transcriptionAnalysis} />
      </div>
    </div>
  )
}
