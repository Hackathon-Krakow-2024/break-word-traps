import { Card, CardContent, Typography } from '@mui/material'

export const Widget = ({
  label,
  customText,
  children,
}: {
  label: string
  customText?: string
  children?: React.ReactNode
}) => {
  return (
    <Card className='mx-auto h-[240px] w-[200px] max-w-sm overflow-hidden rounded-lg shadow-lg'>
      <CardContent className='flex flex-col items-center justify-center p-6'>
        <Typography variant='h5' className='mb-4 h-[60px] text-center font-bold text-gray-800'>
          {label}
        </Typography>
        {children}
        <Typography variant='body2' className='text-center text-gray-600'>
          {customText && <span className='font-bold'>{customText}</span>}
        </Typography>
      </CardContent>
    </Card>
  )
}
