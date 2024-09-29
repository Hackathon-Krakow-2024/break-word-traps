import { Gauge } from '@mui/x-charts/Gauge'
import { useEffect, useState } from 'react'

import { analyzeText, getTranscriptAndSubtitles } from '../../api/ai'
import { TranscriptionAnalysis, TranscriptionResponse } from '../../models/Transcription'
import { Video } from './Video'
import VideoUpload from '../../components/VideoUpload'
import VideoActions from '../../components/VideoActions'
import { ErrorList } from '../../components/ErrorList'
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
  }, [video])

  const handleVerifyVideo = async () => {
    if (!video) return
    setIsButtonDisabled(true)

    console.log(isLoading)

    // const result = {
    //   transcript:
    //     ' Kiedy wybrałeś dostosowany hotel pod wózek, ale nie możesz tam wjechać. Do stołówki masz podjazd, więc też nie możesz tam wjechać, ale jak już wjedziesz to jest duży próg, którego i tak nie pokonasz. A żeby nie było za dobrze, to do pokoju masz kilka schodków, a jak już się tam jakoś dostaniesz, to do pokoju masz próg. Także ja pierdolę.',
    //   subtitles:
    //     'WEBVTT\n\n00:00.000 --> 00:03.240\nKiedy wybrałeś dostosowany hotel pod wózek, ale nie możesz tam wjechać.\n\n00:03.240 --> 00:07.879\nDo stołówki masz podjazd, więc też nie możesz tam wjechać, ale jak już wjedziesz to jest duży próg, którego i tak nie pokonasz.\n\n00:07.879 --> 00:12.539\nA żeby nie było za dobrze, to do pokoju masz kilka schodków, a jak już się tam jakoś dostaniesz, to do pokoju masz próg.\n\n00:12.539 --> 00:13.820\nTakże ja pierdolę.',
    // }
    // setTranscription(result)
    // setIsLoading(false)

    // setTranscriptionAnalysis({
    //   fog_message: 'Wypowiedź jest prosta do zrozumienia.',
    //   fog_score: 8.46,
    //   sentiment: {
    //     emotions: {
    //       kind: 'neutral',
    //       score: 5,
    //     },
    //     hateSpeech: false,
    //   },
    //   targetGroup: 'dorośli, wykształcenie średnie i wyższe',
    //   grammarScore: 7.5,
    //   tooManyNumbers: true,
    //   hasJargon: false,
    //   hasForeignLanguage: false,
    //   hasNonExistentWords: false,
    //   isPassive: false,
    //   tooManyRepetitions: false,
    //   hasTopicChange: false,
    // })

    try {
      setIsLoading(true)
      const result = await getTranscriptAndSubtitles(video)
      setTranscription(result)
      const analysis = await analyzeText(result.transcript)
      setTranscriptionAnalysis(analysis)
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='grid grid-cols-2 grid-rows-2 bg-zinc-100 p-2'>
      <div>
        <VideoUpload handleUploadVideo={onDrop} />
        <Video videoFile={video} subtitles={transcription.subtitles} />
        <VideoActions handleVerifyVideo={handleVerifyVideo} isButtonDisabled={isButtonDisabled} />
      </div>
      <div>
        <Gauge width={100} height={100} value={60} />
        <Gauge width={100} height={100} value={60} />
        <Gauge width={100} height={100} value={60} />
      </div>
      <div>
        <div className='flex flex-col items-center'>
          <h2 className='mb-2 text-lg font-medium'>Wyniki analizy</h2>
          <p className='text-sm text-gray-900 dark:text-white'>{transcription.transcript}</p>
          <p>Pytania</p>
        </div>
      </div>
      <div>
        <ErrorList transcriptionAnalysis={transcriptionAnalysis} />
      </div>
    </div>
  )
}
