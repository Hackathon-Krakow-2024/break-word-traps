import { useEffect, useState } from 'react'
import { Alert, Box, Typography } from '@mui/material'
import { analyzeText, getTranscriptAndSubtitles, prepareQuestions } from '../../api/ai'
import { TranscriptionAnalysis, TranscriptionResponse } from '../../models/Transcription'
import { Video } from './Video'
import VideoUpload from '../../components/VideoUpload'
import VideoActions from '../../components/VideoActions'
import { ErrorList } from '../../components/ErrorList'
import QuestionList from '../../components/QuestionList'
import TextAnalysisMetrics from '../../components/TextAnalysisMetrics'
import CheckIcon from '@mui/icons-material/Check'

// import LoadingIndicator from '../../components/LoadingIndicator'

const emptyState = {
  fog_message: '',
  fog_score: 0,
  sentiment: {
    emotions: {
      kind: '',
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
  const [successAlertVisible, setIsSuccessAlertVisible] = useState<boolean>(false)

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
    setIsSuccessAlertVisible(false)
  }, [video])

  const handleVerifyVideo = async () => {
    if (!video) return
    setIsButtonDisabled(true)

    try {
      setIsLoading(true)
      const result = await getTranscriptAndSubtitles(video)
      setTranscription(result)
      const analysis = await analyzeText(result.transcript)
      setTranscriptionAnalysis(analysis)
      const questions = await prepareQuestions(result.transcript)
      setQuestions(questions)
      setIsSuccessAlertVisible(true)
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='grid grid-cols-1 grid-rows-2 gap-4 p-4 lg:grid-cols-2' style={{ gridTemplateRows: 'auto 1fr' }}>
      <div className='flex flex-col items-center' style={{ minHeight: '200px' }}>
        <VideoUpload handleUploadVideo={onDrop} />
        <Video videoFile={video} subtitles={transcription.subtitles} />
        <VideoActions handleVerifyVideo={handleVerifyVideo} isButtonDisabled={isButtonDisabled} isLoading={isLoading} />
        {successAlertVisible && <Alert className="mb-2" icon={<CheckIcon fontSize="inherit" />} severity="success">Analiza zakończona</Alert> }
        <p className='text-xs text-gray-500'>Analiza zajmuje około 2 sekund na każdą sekundę wideo.</p>
      </div>

      <TextAnalysisMetrics transcriptionAnalysis={transcriptionAnalysis} />

      <div className='flex flex-col items-center'>
        {transcription?.transcript?.length > 0 && (
          <Box className='mb-5 rounded-lg border border-solid border-gray-300 bg-white p-6'>
            <h2 className='mb-2 text-xl font-semibold'>Transkrypcja nagrania:</h2>
            <Typography className='text-sm text-gray-900'>{transcription.transcript}</Typography>
          </Box>
        )}
        <QuestionList questions={questions} />
      </div>
      <div className="-mt-14">
        <ErrorList transcriptionAnalysis={transcriptionAnalysis} />
      </div>
    </div>
  )
}
