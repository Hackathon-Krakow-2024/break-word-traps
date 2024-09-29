import { useEffect, useState } from 'react'
import { GaugeWidget } from '../../components/GaugeWidget'
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
        <p className='text-sm'>Analiza zajmuje około 2 sekund na każdą sekundę wideo.</p>
      </div>
      <div className='grid grid-cols-2 gap-4' style={{ minHeight: '200px' }}>
        <GaugeWidget
          color={getFogColor(transcriptionAnalysis.fog_score)}
          label='Zrozumiałość'
          value={transcriptionAnalysis.fog_score}
          customText={transcriptionAnalysis.fog_message}
          valueMax={18}
        />
        <GaugeWidget
          color={getColor(transcriptionAnalysis.grammarScore)}
          label='Poprawność gramatyczna'
          value={transcriptionAnalysis.grammarScore}
          valueMax={10}
        />
        <GaugeWidget label='Typ emocji' customText={transcriptionAnalysis.sentiment.emotions.kind} />
        <GaugeWidget label='Docelowy odbiorca' customText={transcriptionAnalysis.targetGroup} />
      </div>
      <div className='flex flex-col items-center'>
        <p className='m-3 rounded-xl border-2 border-blue-300 bg-blue-200 p-3 text-sm text-gray-900'>
          {transcription.transcript}
        </p>
        <QuestionList questions={questions} />
      </div>
      <div>
        <ErrorList transcriptionAnalysis={transcriptionAnalysis} />
      </div>
    </div>
  )
}
