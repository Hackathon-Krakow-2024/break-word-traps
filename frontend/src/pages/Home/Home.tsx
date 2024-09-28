import { Container } from '@mui/material'
import { useState } from 'react'

import { analyzeText } from '../../api/ai'
import { TranscriptionResponse } from '../../models/Transcription'
import { Video } from './Video'
import VideoUpload from '../../components/VideoUpload'
import VideoActions from '../../components/VideoActions'
import Results from '../../components/Results'
import LoadingIndicator from '../../components/LoadingIndicator'

export const Home = () => {
  const [result, setResult] = useState<TranscriptionResponse>({
    transcript: '',
    subtitles: '',
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onDrop = (acceptedFiles: File[]) => {
    console.log(acceptedFiles)
    const videoFile = acceptedFiles[0]
    setVideo(videoFile)
  }

  const [video, setVideo] = useState<File | null>(null)
  const isButtonDisabled = !video

  // const handleUploadVideo = (e: ChangeEvent<HTMLInputElement>) => {
  //   const video = e.target.files?.[0]
  //   if (!video) return
  //   setVideo(video)
  // }

  const handleVerifyVideo = async () => {
    setIsLoading(true)
    const result = {
      transcript:
        ' Kiedy wybrałeś dostosowany hotel pod wózek, ale nie możesz tam wjechać. Do stołówki masz podjazd, więc też nie możesz tam wjechać, ale jak już wjedziesz to jest duży próg, którego i tak nie pokonasz. A żeby nie było za dobrze, to do pokoju masz kilka schodków, a jak już się tam jakoś dostaniesz, to do pokoju masz próg. Także ja pierdolę.',
      subtitles:
        'WEBVTT\n\n00:00.000 --> 00:03.240\nKiedy wybrałeś dostosowany hotel pod wózek, ale nie możesz tam wjechać.\n\n00:03.240 --> 00:07.879\nDo stołówki masz podjazd, więc też nie możesz tam wjechać, ale jak już wjedziesz to jest duży próg, którego i tak nie pokonasz.\n\n00:07.879 --> 00:12.539\nA żeby nie było za dobrze, to do pokoju masz kilka schodków, a jak już się tam jakoś dostaniesz, to do pokoju masz próg.\n\n00:12.539 --> 00:13.820\nTakże ja pierdolę.',
    }
    setResult(result)
    setIsLoading(false)

    // try {
    //   setIsLoading(true)
    //   const result = await getTranscriptAndSubtitles(video as File)
    //   setResult(result)
    // } catch (e) {
    //   console.log(e)
    // } finally {
    //   setIsLoading(false)
    // }
  }

  const handleClick2 = async () => {
    try {
      setIsLoading(true)
      await analyzeText(
        'W budżecie na 2025 rok przeznaczymy ponad 221,7 mld zł na ochronę zdrowia. Wzrost nakładów o 31,7 mld zł (6,1%). 0,5 mld zł na program INVITRO, 0,8 mld zł na świadczenia aktywnych rodziców, 0,62 i 0,8 mld zł na program rodzina 800+.'
      )
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container className='mx-auto my-10 flex h-screen w-5/6 overflow-y-scroll bg-slate-400 p-2'>
      <Container className='flex h-fit flex-col items-center justify-center gap-1 pl-0'>
        <VideoUpload handleUploadVideo={onDrop} />
        <Video videoFile={video} subtitles={result.subtitles} />
        <VideoActions
          handleVerifyVideo={handleVerifyVideo}
          handleClick2={handleClick2}
          isButtonDisabled={isButtonDisabled}
        />
        {isLoading ? <LoadingIndicator /> : <Results result={result} />}
      </Container>
    </Container>
  )
}
