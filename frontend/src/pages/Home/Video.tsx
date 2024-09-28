import { useRef, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'

type Props = {
  videoFile: File | null
  subtitles: string
}

export const Video = ({ videoFile, subtitles }: Props) => {
  const [videoUrl, setVideoUrl] = useState<string>('')
  const [subtitlesUrl, setSubtitlesUrl] = useState<string>('')

  // Typujemy playerRef zgodnie z typami z react-player
  // const playerRef = useRef<ReactPlayer | null>(null)
  // @ts-expect-error
  const playerRef = useRef<any>(null)

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

  const handleMoveToVideoTime = (timestamp: number) => {
    console.log(videoUrl, 'vu', subtitlesUrl, 'su')
    if (playerRef.current) {
      playerRef.current.seekTo(timestamp, 'seconds')
    }
  }

  return (
    <div>
      <div>
        {/* <video controls> 
          - <source src={videoUrl} type='video/mp4' />
          - <track label='Polski' kind='subtitles' srcLang='pl' src={subtitlesUrl} default />-{' '}
        </video> */}
        {subtitles && (
          <ReactPlayer
            ref={playerRef}
            url={videoUrl}
            controls
            config={{
              file: {
                tracks: [{ kind: 'subtitles', src: subtitlesUrl, srcLang: 'pl', default: true }],
              },
            }}
          />
        )}
        {!subtitles && (
          <ReactPlayer
            ref={playerRef}
            url={videoUrl}
            controls
            config={{
              file: {
                tracks: [{ kind: 'subtitles', src: subtitlesUrl, srcLang: 'pl', default: true }],
              },
            }}
          />
        )}
        <button onClick={() => handleMoveToVideoTime(10)}>Przewiń do 10 sekundy</button>
      </div>
    </div>
  )
}
