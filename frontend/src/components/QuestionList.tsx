
interface QuestionListProp {
	questions: string[]
}

const QuestionList = ({ questions }: QuestionListProp) => {

	if (questions.length === 0) return null

	return (
		<div className="mt-6">
			<h2 className='mb-2 text-lg font-medium'>Możliwe pytania:</h2>
			<ul className='pl-5'>
				{questions.map((question, index) => (
					<li key={index} className='text-gray-900 py-1'>{question}</li>
				))}
			</ul>
		</div>
	)
}

export default QuestionList