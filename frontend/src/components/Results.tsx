import { TranscriptionResponse } from '../models/Transcription'
import { Container } from '@mui/material'
import { ErrorList } from '../components/ErrorList'

type Sentiment = {
  emotions: {
    kind: string // typ emocji, np. 'neutral', 'positive', 'negative'
    score: number // wynik emocji
  }
  hateSpeech: boolean // informacja o mowie nienawiści
}

export type TranscriptionAnalysis = {
  fog_message: string // komunikat o zrozumiałości
  fog_score: number // wynik zrozumiałości
  sentiment: Sentiment // obiekt analizy sentymentu
  targetGroup: string // grupa docelowa
  grammarScore: number // wynik gramatyczny
  tooManyNumbers: boolean // czy jest za dużo liczb
  hasJargon: boolean // czy jest żargon
  hasForeignLanguage: boolean // czy jest język obcy
  hasNonExistentWords: boolean // czy są nieistniejące słowa
  isPassive: boolean // czy użyto strony biernej
  tooManyRepetitions: boolean // czy jest za dużo powtórzeń
  hasTopicChange: boolean // czy nastąpiła zmiana tematu
}

type TranscriptionProps = {
  transcription: TranscriptionResponse
  transcriptionAnalysis: TranscriptionAnalysis
}

const Results = ({ transcription, transcriptionAnalysis }: TranscriptionProps) => {
  if (!transcription || !transcription.transcript) return null

  console.log(transcriptionAnalysis)

  return (
    <Container className='flex flex-col items-start gap-2'>
      <div className='flex flex-col items-center'>
        <h2 className='mb-2 text-lg font-medium'>Wyniki analizy</h2>
        <p className='text-sm text-gray-900 dark:text-white'>{transcription.transcript}</p>
        <ErrorList transcriptionAnalysis={transcriptionAnalysis} />
      </div>
    </Container>
  )
}

export default Results
