import { Card, CardContent, Typography } from '@mui/material'
import { Gauge, gaugeClasses } from '@mui/x-charts'

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
  color: 'green' | 'yellow' | 'red'
  customText?: string
}) => {
  const colorMap = {
    green: '#52b202',
    yellow: '#f7b500',
    red: '#f44336',
  }
  return (
    <Card className='mx-auto h-[240px] w-[200px] max-w-sm overflow-hidden rounded-lg shadow-lg'>
      <CardContent className='flex flex-col items-center justify-center p-6'>
        <Typography variant='h5' className='mb-4 text-center font-bold text-gray-800'>
          {label}
        </Typography>

        <div className='h-[100px] w-[100px]'>
          <Gauge
            value={value}
            valueMax={valueMax}
            startAngle={-110}
            endAngle={110}
            sx={{
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 15,
                transform: 'translate(0px, 0px)',
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: colorMap[color],
              },
            }}
            text={({ value, valueMax }) => `${value} / ${valueMax}`}
          />
        </div>
        <Typography variant='body2' className='text-center text-gray-600'>
          {customText && <span className='font-bold'>{customText}</span>}
        </Typography>
      </CardContent>
    </Card>
  )
}
