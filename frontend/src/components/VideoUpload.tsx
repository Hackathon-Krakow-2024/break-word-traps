import { Box, Typography } from '@mui/material'
import { useDropzone } from 'react-dropzone'

type VideoUploadProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleUploadVideo: any
}

const VideoUpload = ({ handleUploadVideo }: VideoUploadProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'video/*': [
        '.avi',
        '.divx',
        '.flv',
        '.m4v',
        '.mkv',
        '.mov',
        '.mp4',
        '.mpeg',
        '.mpg',
        '.ogm',
        '.ogv',
        '.ogx',
        '.rm',
        '.rmvb',
        '.smil',
        '.webm',
        '.wmv',
        '.xvid',
      ],
    },
    onDrop: handleUploadVideo,
  })

  return (
    <div className='flex w-full min-w-[640px] flex-col'>
      <Box
        {...getRootProps()}
        className={`cursor-pointer rounded-lg border-2 border-dashed p-6 ${isDragActive ? 'border-sky-300 bg-blue-50' : 'border-sky-600 bg-white'} `}
      >
        <input {...getInputProps()} />

        <Typography variant='h6' className='mb-2 text-center'>
          {isDragActive ? 'Upuść plik tutaj...' : 'Przeciągnij tutaj plik wideo lub kliknij, aby wybrać'}
        </Typography>

        <Typography variant='body2' className='text-center text-gray-500'>
          (Dozwolone formaty to *.avi, *.divx, *.flv, *.m4v, *.mkv, *.mov, *.mp4, *.mpeg, *.mpg, *.ogm, *.ogv, *.ogx,
          *.rm, *.rmvb, *.smil, *.webm, *.wmv i *.xvid)
        </Typography>
      </Box>
    </div>
  )
}

export default VideoUpload
