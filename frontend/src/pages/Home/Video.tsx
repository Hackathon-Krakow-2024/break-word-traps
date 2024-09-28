import { useEffect, useState } from 'react'

type Props = {
  videoFile: File | null
  subtitles: string
}

export const Video = ({ videoFile, subtitles }: Props) => {
  const [videoUrl, setVideoUrl] = useState<string>('')
  const [subtitlesUrl, setSubtitlesUrl] = useState<string>('')

  useEffect(() => {
    if (videoFile) {
      const url = URL.createObjectURL(videoFile)
      setVideoUrl(url)

      return () => {
        URL.revokeObjectURL(url)
      }
    }
  }, [videoFile])

  useEffect(() => {
    if (subtitles) {
      const blob = new Blob([subtitles], { type: 'text/vtt' })
      const url = URL.createObjectURL(blob)
      setSubtitlesUrl(url)

      return () => {
        URL.revokeObjectURL(url)
      }
    }
  }, [subtitles])

  if (!videoUrl) return null

  return (
    <video controls>
      <source src={videoUrl} type='video/mp4' />
      <track label='Polski' kind='subtitles' srcLang='pl' src={subtitlesUrl} default />
    </video>
  )
}
