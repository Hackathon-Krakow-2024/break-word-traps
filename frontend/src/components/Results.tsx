import { TranscriptionResponse } from '../models/Transcription'
import { Container } from '@mui/material'

type ResultsProps = {
  result: TranscriptionResponse
}

const Results = ({ result }: ResultsProps) => {
  if (!result || !result.transcript) return null

  return (
    <Container className='flex flex-col items-start gap-2'>
      <div className='flex flex-col items-center'>
        <h2 className='mb-2 text-lg font-medium'>Result</h2>
        <p className='text-sm text-gray-900 dark:text-white'>{result.transcript}</p>
      </div>
    </Container>
  )
}

export default Results
