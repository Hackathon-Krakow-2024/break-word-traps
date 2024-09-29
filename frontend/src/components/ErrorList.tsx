import { TranscriptionAnalysis } from '../models/Transcription'
import { ListItem } from './ListItem'

type Props = {
  transcriptionAnalysis: TranscriptionAnalysis
}

export const ErrorList = ({ transcriptionAnalysis }: Props) => (
  <div className='flex w-[600px]'>
    <div className='w-1/2'>
      <ListItem type='tooManyNumbers' value={transcriptionAnalysis.tooManyNumbers} />
      <ListItem type='hateSpeech' value={transcriptionAnalysis.sentiment.hateSpeech} />
      <ListItem type='hasJargon' value={transcriptionAnalysis.hasJargon} />
      <ListItem type='hasForeignLanguage' value={transcriptionAnalysis.hasForeignLanguage} />
    </div>
    <div className='w-1/2'>
      <ListItem type='hasNonExistentWords' value={transcriptionAnalysis.hasNonExistentWords} />
      <ListItem type='isPassive' value={transcriptionAnalysis.isPassive} />
      <ListItem type='tooManyRepetitions' value={transcriptionAnalysis.tooManyRepetitions} />
      <ListItem type='hasTopicChange' value={transcriptionAnalysis.hasTopicChange} />
    </div>
  </div>
)
