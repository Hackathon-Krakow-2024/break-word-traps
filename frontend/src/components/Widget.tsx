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
    <Card className='mx-auto h-full min-h-[200px] w-full overflow-hidden rounded-lg shadow-lg'>
      <CardContent className='flex flex-grow flex-col items-center justify-center p-6'>
        <Typography className='text-md mb-4 h-[60px] text-center font-bold text-gray-800'>{label}</Typography>
        {children}
        <Typography variant='body2' className='text-center text-gray-600'>
          {customText && <span className='font-bold'>{customText}</span>}
        </Typography>
      </CardContent>
    </Card>
  )
}
