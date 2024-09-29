import { Box } from '@mui/material'
interface QuestionListProp {
  questions: string[]
}

const QuestionList = ({ questions }: QuestionListProp) => {
  if (questions.length === 0) return null

  return (
    <Box className='mb-5 rounded-lg border border-solid border-gray-300 bg-white p-6 w-full'>
      <h2 className='mb-2 text-xl font-semibold'>Możliwe pytania:</h2>
      <ul className='list-inside list-disc'>
        {questions.map((question, index) => (
          <li key={index} className='pb-1 pl-2 text-gray-900'>
            {question}
          </li>
        ))}
      </ul>
    </Box>
  )
}

export default QuestionList
