import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { GaugeWidget } from '../../components/GaugeWidget'
import { analyzeText, getTranscriptAndSubtitles, prepareQuestions } from '../../api/ai'
import { TranscriptionAnalysis, TranscriptionResponse } from '../../models/Transcription'
import { Video } from './Video'
import VideoUpload from '../../components/VideoUpload'
import VideoActions from '../../components/VideoActions'
import { ErrorList } from '../../components/ErrorList'
import QuestionList from '../../components/QuestionList'
import { Widget } from '../../components/Widget'
import Groups2Icon from '@mui/icons-material/Groups2'
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied'
import { grey } from '@mui/material/colors'
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

  const getInvertedFogScore = (fogScore: number) => {
    if (fogScore === 0) return 0
    if (fogScore > 18) return 0

    return 18 - fogScore
  }

  const getFogColor = (fogScore: number) => {
    if (fogScore < 7) return 'green'
    if (fogScore < 13) return 'yellow'
    return 'red'
  }

  const getColor = (value: number) => {
    if (value < 4) return 'red'
    if (value < 7) return 'yellow'
    return 'green'
  }

  return (
    <div className='grid grid-cols-1 grid-rows-2 gap-4 p-4 lg:grid-cols-2' style={{ gridTemplateRows: 'auto 1fr' }}>
      <div className='flex flex-col items-center' style={{ minHeight: '200px' }}>
        <VideoUpload handleUploadVideo={onDrop} />
        <Video videoFile={video} subtitles={transcription.subtitles} />
        <VideoActions handleVerifyVideo={handleVerifyVideo} isButtonDisabled={isButtonDisabled} />
        <p className='text-xs text-gray-500'>Analiza zajmuje około 2 sekund na każdą sekundę wideo.</p>
      </div>
      <div className='grid grid-cols-2 gap-4' style={{ minHeight: '200px' }}>
        <GaugeWidget
          color={getFogColor(transcriptionAnalysis.fog_score)}
          label='Zrozumiałość'
          value={getInvertedFogScore(transcriptionAnalysis.fog_score)}
          customText={transcriptionAnalysis.fog_message}
          valueMax={18}
        />
        <GaugeWidget
          color={getColor(transcriptionAnalysis.grammarScore)}
          label='Poprawność gramatyczna'
          value={transcriptionAnalysis.grammarScore}
          valueMax={10}
        />
        <Widget label='Typ emocji' customText={transcriptionAnalysis.sentiment.emotions.kind}>
          <div className='mb-2 mt-7'>
            <SentimentSatisfiedIcon sx={{ fontSize: 40, color: grey[400] }} />
          </div>
        </Widget>
        <Widget label='Docelowy odbiorca' customText={transcriptionAnalysis.targetGroup}>
          <div className='mb-2 mt-7'>
            <Groups2Icon sx={{ fontSize: 40, color: grey[400] }} />
          </div>
        </Widget>
      </div>
      <div className='flex cursor-pointer flex-col items-center'>
        {transcription?.transcript?.length > 0 && (
          <Box className='mb-5 rounded-lg border border-solid border-gray-300 bg-white p-6'>
            <h2 className='mb-2 text-xl font-semibold'>Transkrypcja nagrania:</h2>
            <Typography className='text-sm text-gray-900'>{transcription.transcript}</Typography>
          </Box>
        )}
        <QuestionList questions={questions} />
      </div>
      <div>
        <ErrorList transcriptionAnalysis={transcriptionAnalysis} />
      </div>
    </div>
  )
}
