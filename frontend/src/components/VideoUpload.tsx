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
    <div className='flex flex-col'>
      <Box
        {...getRootProps()}
        className={`rounded-lg border border-solid p-6 ${isDragActive ? 'border-sky-300 bg-blue-50' : 'border-gray-300 bg-white'} `}
      >
        <input {...getInputProps()} />

        <h2 className='mb-2 text-xl font-semibold'>
          {/* <Typography className='mb-2 text-center text-sm'> */}
          {isDragActive ? 'Upuść plik tutaj...' : 'Przeciągnij tutaj plik wideo lub kliknij, aby wybrać'}
          {/* </Typography> */}
        </h2>

        <Typography variant='body2' className='text-center text-gray-500'>
          (Dozwolone formaty to *.avi, *.divx, *.flv, *.m4v, *.mkv, *.mov, *.mp4, *.mpeg, *.mpg, *.ogm, *.ogv, *.ogx,
          *.rm, *.rmvb, *.smil, *.webm, *.wmv i *.xvid)
        </Typography>
      </Box>
    </div>
  )
}

export default VideoUpload
