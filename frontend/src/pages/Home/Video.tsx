import { useRef, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'

type Props = {
  videoFile: File | null
  subtitles: string
}

export const Video = ({ videoFile, subtitles }: Props) => {
  const [videoUrl, setVideoUrl] = useState<string>('')
  const [subtitlesUrl, setSubtitlesUrl] = useState<string>('')
  const playerRef = useRef<ReactPlayer | null>(null)

  useEffect(() => {
    if (videoFile) {
      const url = URL.createObjectURL(videoFile)
      setVideoUrl(url)

      return () => {
        if (url) {
          URL.revokeObjectURL(url)
        }
      }
    }
  }, [videoFile])

  useEffect(() => {
    if (subtitles) {
      const blob = new Blob([subtitles], { type: 'text/vtt' })
      const url = URL.createObjectURL(blob)
      setSubtitlesUrl(url)

      return () => {
        if (url) {
          URL.revokeObjectURL(url)
        }
      }
    }
  }, [subtitles])

  if (!videoUrl) return null

  // const handleMoveToVideoTime = (timestamp: number) => {
  //   if (playerRef.current) {
  //     playerRef.current.seekTo(timestamp, 'seconds')
  //   }
  // }

  return (
    <div>
      <div>
        <ReactPlayer
          ref={playerRef}
          url={videoUrl}
          key={subtitlesUrl}
          controls
          config={{
            file: {
              tracks: [{ kind: 'subtitles', src: subtitlesUrl, srcLang: 'pl', default: true, label: 'video react' }],
            },
          }}
        />

        {/* <button
          onClick={() => handleMoveToVideoTime(10)}
          className='mb-2 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-slate-600 md:w-auto md:min-w-[350px] dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Move
        </button> */}
      </div>
    </div>
  )
}
