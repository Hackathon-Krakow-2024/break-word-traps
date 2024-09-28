import { Button, Container, Input } from '@mui/material'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { deleteTodoById, getAllTodos } from '../../api/todos'
import { Todo } from '../../models/Todo'

type Props = {
  setTodos: Dispatch<SetStateAction<Todo[]>>
}

export const DeleteTodoSection = ({ setTodos }: Props) => {
  const [id, setId] = useState<string>('')

  const handleDeleteTodoById = async () => {
    await deleteTodoById(id)
    setId('')
    const todos = await getAllTodos()
    setTodos(todos)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value)
  }

  const isButtonDisabled = !id

  return (
    <Container className='flex gap-2'>
      <Button variant='contained' onClick={handleDeleteTodoById} className='w-fit' disabled={isButtonDisabled}>
        Delete Todo By Id
      </Button>
      <Input placeholder='ID' className='w-fit' onChange={handleChange} value={id} />
    </Container>
  )
}
