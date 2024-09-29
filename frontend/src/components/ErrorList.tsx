import { TranscriptionAnalysis } from '../models/Transcription'
import { ListItem } from './ListItem'

type Props = {
  transcriptionAnalysis: TranscriptionAnalysis
}

export const ErrorList = ({ transcriptionAnalysis }: Props) => (
  <div className='flex flex-col items-center justify-center text-left md:mt-9'>
    <h2 className='mb-4 text-xl font-semibold'>Wykryte błędy w wypowiedzi</h2>
    <div className='flex justify-between gap-6 w-[80%] ml-6'>
      <div className='flex w-1/2 flex-col'>
        <ListItem type='tooManyNumbers' value={transcriptionAnalysis.tooManyNumbers} />
        <ListItem type='hateSpeech' value={transcriptionAnalysis.sentiment.hateSpeech} />
        <ListItem type='hasJargon' value={transcriptionAnalysis.hasJargon} />
        <ListItem type='hasForeignLanguage' value={transcriptionAnalysis.hasForeignLanguage} />
      </div>
      <div className='flex w-1/2 flex-col'>
        <ListItem type='hasNonExistentWords' value={transcriptionAnalysis.hasNonExistentWords} />
        <ListItem type='isPassive' value={transcriptionAnalysis.isPassive} />
        <ListItem type='tooManyRepetitions' value={transcriptionAnalysis.tooManyRepetitions} />
        <ListItem type='hasTopicChange' value={transcriptionAnalysis.hasTopicChange} />
      </div>
    </div>
  </div>
)
