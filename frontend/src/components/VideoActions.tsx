import { Button } from '@mui/material'

type VideoActionsProps = {
  handleVerifyVideo: () => void
  isButtonDisabled: boolean
}

const VideoActions = ({ handleVerifyVideo, isButtonDisabled }: VideoActionsProps) => {
  return (
    <div className='mb-5 mt-5 flex flex-col gap-2 md:flex-row md:items-center'>
      <Button onClick={handleVerifyVideo} disabled={isButtonDisabled} variant='outlined'>
        Transcribe
      </Button>
    </div>
  )
}

export default VideoActions
