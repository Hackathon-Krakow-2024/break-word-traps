import { Container } from '@mui/material'
import { ChangeEvent, useState } from 'react'

import { getTranscriptAndSubtitles, analyzeText } from '../../api/ai'
import { Video } from './Video'
import { TranscriptionResponse } from '../../models/Transcription'

export const Home = () => {
  const [video, setVideo] = useState<File | null>(null)
  const [result, setResult] = useState<TranscriptionResponse>({
    transcript: '',
    subtitles: '',
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const isButtonDisabled = !video

  const handleUploadVideo = (e: ChangeEvent<HTMLInputElement>) => {
    const video = e.target.files?.[0]
    if (!video) return
    setVideo(video)
  }

<<<<<<< HEAD
  const handleClick = async () => {
    try {
      setIsLoading(true)
      const result = await getTranscriptAndSubtitles(video as File)
      setResult(result)
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
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
=======
  const handleVerifyVideo = () => {
    const result = {
      transcript:
        ' Kiedy wybrałeś dostosowany hotel pod wózek, ale nie możesz tam wjechać. Do stołówki masz podjazd, więc też nie możesz tam wjechać, ale jak już wjedziesz to jest duży próg, którego i tak nie pokonasz. A żeby nie było za dobrze, to do pokoju masz kilka schodków, a jak już się tam jakoś dostaniesz, to do pokoju masz próg. Także ja pierdolę.',
      subtitles:
        'WEBVTT\n\n00:00.000 --> 00:03.240\nKiedy wybrałeś dostosowany hotel pod wózek, ale nie możesz tam wjechać.\n\n00:03.240 --> 00:07.879\nDo stołówki masz podjazd, więc też nie możesz tam wjechać, ale jak już wjedziesz to jest duży próg, którego i tak nie pokonasz.\n\n00:07.879 --> 00:12.539\nA żeby nie było za dobrze, to do pokoju masz kilka schodków, a jak już się tam jakoś dostaniesz, to do pokoju masz próg.\n\n00:12.539 --> 00:13.820\nTakże ja pierdolę.',
>>>>>>> 7dedf8a (ov test video)
    }
  }

  return (
    <Container className='mx-auto my-10 flex h-screen w-5/6 overflow-y-scroll bg-slate-400 p-2'>
      <Container className='flex h-fit flex-col items-center justify-center gap-1 pl-0'>
        <Container className='flex flex-col items-start gap-2'>
          <label className='mb-2 block text-sm font-medium text-gray-900 dark:text-white' htmlFor='video'>
            Upload Video
          </label>
          <input
            // className='block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400'
            id='video'
            type='file'
            onChange={handleUploadVideo}
            accept='.mp4'
          />
          <Video videoFile={video} subtitles={result.subtitles} />
          <button
            onClick={handleVerifyVideo}
            disabled={isButtonDisabled}
            className='mb-2 me-2 w-fit rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-slate-600 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
<<<<<<< HEAD
            Transcribe
          </button>
          <button
            onClick={handleClick2}
            className='mb-2 me-2 w-fit rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-slate-600 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Analyze
=======
            Verify video
>>>>>>> 7dedf8a (ov test video)
          </button>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className='flex flex-col items-center'>
              {result ? (
                <>
                  <h2 className='mb-2 text-lg font-medium'>Result</h2>
                  <p className='text-sm text-gray-900 dark:text-white'>{result.transcript}</p>
                </>
              ) : null}
            </div>
          )}
        </Container>
      </Container>
    </Container>
  )
}
