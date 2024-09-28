import { Box, Typography } from '@mui/material'
import React from 'react'
import { useDropzone } from 'react-dropzone'

type VideoUploadProps = {
  handleUploadVideo: (event: any) => void
}

const VideoUpload: React.FC<VideoUploadProps> = ({ handleUploadVideo }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'video/*': ['.mp4'],
    },
    onDrop: handleUploadVideo,
  })

  return (
    <div className='flex flex-col bg-gray-100'>
      <Box
        {...getRootProps()}
        className={`w-full max-w-md cursor-pointer rounded-lg border-2 border-dashed p-6 ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'} `}
      >
        <input {...getInputProps()} />

        <Typography variant='h6' className='mb-2 text-center'>
          {isDragActive ? 'Drop the video here...' : 'Drag & drop a video file here, or click to select one'}
        </Typography>

        <Typography variant='body2' className='text-center text-gray-500'>
          (Only *.mp4 format accepted)
        </Typography>
      </Box>
    </div>
  )
}

export default VideoUpload
