import { Button, CircularProgress } from '@mui/material'

type VideoActionsProps = {
  handleVerifyVideo: () => void
  isButtonDisabled: boolean
  isLoading: boolean
}

const VideoActions = ({ handleVerifyVideo, isButtonDisabled, isLoading }: VideoActionsProps) => {
  return (
    <div className='mb-5 mt-5 flex flex-col gap-2 md:flex-row md:items-center'>
      <Button onClick={handleVerifyVideo} disabled={isButtonDisabled} variant='contained' >
        {isLoading && <>
          <CircularProgress size={20} className='mr-2'/>
          Analizowanie...
        </>
        }
        {!isLoading && 'Analizuj nagranie'}
      </Button>
    </div>
  )
}

export default VideoActions
