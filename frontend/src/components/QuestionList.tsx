import { Box } from '@mui/material'
interface QuestionListProp {
  questions: string[]
}

const QuestionList = ({ questions }: QuestionListProp) => {
  if (questions.length === 0) return null

  return (
    <Box className='mb-5 rounded-lg border border-solid border-gray-300 bg-white p-6'>
      <h2 className='mb-2 text-xl font-semibold'>Możliwe pytania:</h2>
      <ul>
        {questions.map((question, index) => (
          <li key={index} className='py-1 pt-0 text-gray-900'>
            {question}
          </li>
        ))}
      </ul>
    </Box>
    // <div className='mt-6'>
    //   <h2 className='mb-2 text-xl font-semibold'>Możliwe pytania:</h2>
    //   <ul className='pl-5'>
    //     {questions.map((question, index) => (
    //       <li key={index} className='py-1 text-gray-900'>
    //         {question}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  )
}

export default QuestionList
