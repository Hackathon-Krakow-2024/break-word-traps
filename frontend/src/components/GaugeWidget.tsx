import { Gauge, gaugeClasses } from '@mui/x-charts'
import { Widget } from './Widget'

export const GaugeWidget = ({
  label,
  value,
  valueMax,
  color,
  customText,
}: {
  label: string
  value: number
  valueMax: number
  color?: 'green' | 'yellow' | 'red'
  customText?: string
}) => {
  const colorMap = {
    green: '#52b202',
    yellow: '#f7b500',
    red: '#f44336',
  }
  return (
    <Widget label={label} customText={customText}>
      <div className='h-[100px] w-[100px]'>
        <Gauge
          value={value > valueMax ? valueMax : value}
          valueMax={valueMax}
          startAngle={-110}
          endAngle={110}
          sx={{
            [`& .${gaugeClasses.valueText}`]: {
              fontSize: 15,
              transform: 'translate(0px, 0px)',
            },
            [`& .${gaugeClasses.valueArc}`]: {
              fill: colorMap[color as 'green' | 'yellow' | 'red'],
            },
          }}
          text={() => ``}
        />
      </div>
    </Widget>
  )
}
