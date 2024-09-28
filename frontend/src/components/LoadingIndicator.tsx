import { Skeleton } from '@mui/material'

const LoadingIndicator = () => {
  return (
    <div className='mb-8 flex flex-col gap-4 p-2'>
      <Skeleton variant='rectangular' width={1100} height={50} />
      <Skeleton variant='rectangular' width={1100} height={50} />
      <Skeleton variant='rectangular' width={1100} height={50} />
      <Skeleton variant='rectangular' width={1100} height={50} />
      <Skeleton variant='rectangular' width={1100} height={50} />
      <Skeleton variant='rectangular' width={1100} height={50} />
    </div>
  )
}

export default LoadingIndicator
