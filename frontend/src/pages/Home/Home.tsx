import { Container } from '@mui/material'
import { useEffect, useState } from 'react'

import { analyzeText, getTranscriptAndSubtitles } from '../../api/ai'
import { TranscriptionResponse } from '../../models/Transcription'
import { Video } from './Video'
import VideoUpload from '../../components/VideoUpload'
import VideoActions from '../../components/VideoActions'
import Results, { TranscriptionAnalysis } from '../../components/Results'
import LoadingIndicator from '../../components/LoadingIndicator'
import { ErrorList } from '../../components/ErrorList'

export const Home = () => {
  const [transcription, setTranscription] = useState<TranscriptionResponse>({
    transcript: '',
    subtitles: '',
  })
  const [transcriptionAnalysis, setTranscriptionAnalysis] = useState<TranscriptionAnalysis | null>(null)

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
    setTranscriptionAnalysis(null)
  }, [video])

  const handleVerifyVideo = async () => {
    if (!video) return
    setIsButtonDisabled(true)

    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      })
    })
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
    <Container className='mx-auto my-10 flex w-5/6 bg-zinc-100 pt-8'>
      <Container className='flex h-fit flex-col items-center justify-center gap-4 pl-0'>
        <VideoUpload handleUploadVideo={onDrop} />
        <Video videoFile={video} subtitles={transcription.subtitles} />
        <VideoActions handleVerifyVideo={handleVerifyVideo} isButtonDisabled={isButtonDisabled} />
        {isLoading && <LoadingIndicator />}
        {transcriptionAnalysis && (
          <Results transcription={transcription} transcriptionAnalysis={transcriptionAnalysis} />
        )}
        {transcriptionAnalysis && <ErrorList transcriptionAnalysis={transcriptionAnalysis} />}
      </Container>
    </Container>
  )
}
