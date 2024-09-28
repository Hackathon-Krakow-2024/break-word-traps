import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { Todo } from '../../models/Todo'
import { Button, Container, Input } from '@mui/material'
import { getTodoById } from '../../api/todos'

type Props = {
  setTodos: Dispatch<SetStateAction<Todo[]>>
}

export const GetTodoByIdSection = ({ setTodos }: Props) => {
  const [id, setId] = useState<string>('')

  const handleGetTodoById = async () => {
    const data = await getTodoById(id)
    setTodos(data)
    setId('')
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value)
  }

  const isButtonDisabled = !id

  return (
    <Container className='flex gap-2'>
      <Button variant='contained' onClick={handleGetTodoById} className='w-fit' disabled={isButtonDisabled}>
        Get Todo By Id
      </Button>
      <Input placeholder='ID' className='w-fit' onChange={handleChange} value={id} />
    </Container>
  )
}
