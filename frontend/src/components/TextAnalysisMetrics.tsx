import React from 'react'
import { GaugeWidget } from '../components/GaugeWidget'
import { Widget } from '../components/Widget'
import Groups2Icon from '@mui/icons-material/Groups2'
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied'
import { grey } from '@mui/material/colors'

type Props = {
  transcriptionAnalysis: {
    fog_score: number
    fog_message: string
    grammarScore: number
    sentiment: {
      emotions: {
        kind: string
      }
    }
    targetGroup: string
  }
}

const TextAnalysisMetrics: React.FC<Props> = ({ transcriptionAnalysis }) => {
  const getInvertedFogScore = (fogScore: number) => {
    if (fogScore === 0) return 0
    if (fogScore > 18) return 0

    return 18 - fogScore
  }

  const getFogColor = (fogScore: number) => {
    if (fogScore < 7) return 'green'
    if (fogScore < 13) return 'yellow'
    return 'red'
  }

  const getColor = (value: number) => {
    if (value < 4) return 'red'
    if (value < 7) return 'yellow'
    return 'green'
  }

  return (
    <div className='mb-5 p-6'>
      <h2 className='mb-2 text-center text-xl font-semibold'>Metryki Transkrypcji</h2>
      <div className='mt-4 grid grid-cols-2 gap-4' style={{ minHeight: '200px' }}>
        <GaugeWidget
          color={getFogColor(transcriptionAnalysis.fog_score)}
          label='Zrozumiałość treści'
          value={getInvertedFogScore(transcriptionAnalysis.fog_score)}
          customText={transcriptionAnalysis.fog_message}
          valueMax={18}
        />
        <GaugeWidget
          color={getColor(transcriptionAnalysis.grammarScore)}
          label='Poprawność gramatyczna'
          value={transcriptionAnalysis.grammarScore}
          valueMax={10}
        />
        <Widget label='Typ emocji' customText={transcriptionAnalysis.sentiment.emotions.kind}>
          <div className='mb-2 mt-7'>
            <SentimentSatisfiedIcon sx={{ fontSize: 40, color: grey[400] }} />
          </div>
        </Widget>
        <Widget label='Docelowy odbiorca' customText={transcriptionAnalysis.targetGroup}>
          <div className='mb-2 mt-7'>
            <Groups2Icon sx={{ fontSize: 40, color: grey[400] }} />
          </div>
        </Widget>
      </div>
    </div>
  )
}

export default TextAnalysisMetrics
