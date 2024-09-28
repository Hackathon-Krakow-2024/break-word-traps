import React from 'react'

type VideoUploadProps = {
  handleUploadVideo: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const VideoUpload: React.FC<VideoUploadProps> = ({ handleUploadVideo }) => {
  return (
    <div>
      <label className='mb-2 block text-sm font-medium text-gray-900 dark:text-white' htmlFor='video'>
        Upload Video
      </label>
      <input
        className='block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400'
        id='video'
        type='file'
        onChange={handleUploadVideo}
        accept='.mp4'
      />
    </div>
  )
}

export default VideoUpload
