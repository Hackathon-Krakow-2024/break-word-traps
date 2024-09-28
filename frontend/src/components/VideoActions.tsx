type VideoActionsProps = {
  handleVerifyVideo: () => void
  isButtonDisabled: boolean
}

const VideoActions = ({ handleVerifyVideo, isButtonDisabled }: VideoActionsProps) => {
  return (
    <div className='mb-5 mt-5 flex flex-col gap-2 md:flex-row md:items-center'>
      <button
        onClick={handleVerifyVideo}
        disabled={isButtonDisabled}
        className='mb-2 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-slate-600 md:w-auto md:min-w-[350px] dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        Transcribe
      </button>
    </div>
  )
}

export default VideoActions
