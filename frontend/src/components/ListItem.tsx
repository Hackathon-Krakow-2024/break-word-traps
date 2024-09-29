import InfoIcon from '@mui/icons-material/Info';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { Tooltip } from '@mui/material';

type Props = {
  type: keyof typeof items
  value: boolean
}

const items: Record<string, { text: string; description: string }> = {
  tooManyNumbers: {
    text: 'Za dużo liczb',
    description: 'Współczynnik określa czy wypowiedź zawiera liczby w ilości większej niż 10%.',
  },
  hateSpeech: {
    text: 'Mowa nienawiści',
    description: 'Współczynnik określa czy wypowiedź zawiera mowę nienawiści.',
  },
  hasJargon: {
    text: 'Żargon',
    description: 'Współczynnik określa czy wypowiedź zawiera żargon.',
  },
  hasForeignLanguage: {
    text: 'Język obcy',
    description: 'Współczynnik określa czy wypowiedź zawiera język obcy.',
  },
  hasNonExistentWords: {
    text: 'Nieistniejące słowa',
    description: 'Współczynnik określa czy wypowiedź zawiera nieistniejące słowa.',
  },
  isPassive: {
    text: 'Strona bierna',
    description: 'Współczynnik określa czy wypowiedź zawiera stronę bierną.',
  },
  tooManyRepetitions: {
    text: 'Za dużo powtórzeń',
    description: 'Współczynnik określa czy wypowiedź zawiera zbyt dużo powtórzeń.',
  },
  hasTopicChange: {
    text: 'Zmiana tematu',
    description: 'Współczynnik określa czy wypowiedź zawiera zmianę tematu.',
  },
}

export const ListItem = ({ type, value }: Props) => {
  if (type in items) {
    return (
      <div
        className='flex w-fit gap-2 text-left mb-1 items-center'
        style={
          value
            ? {
                textDecorationLine: 'underline',
                textDecorationStyle: 'wavy',
                textDecorationColor: '#ef4444',
                textUnderlineOffset: '4px',
              }
            : {}
        }
      >
        {value && <ReportProblemIcon htmlColor='red' fontSize='small' />}
        <span className={`text-nowrap text-md  ${value && 'text-red-500'} ${!value && 'text-gray-500 ml-7'}`}>{items[type].text}</span>
        <Tooltip title={items[type].description} arrow placement='top-end'>
          <InfoIcon
            htmlColor='#a9bdd2'
            fontSize='small'
          />
        </Tooltip>
      </div>
    )
  }
  return null
}
