import { Button, Container } from '@mui/material'
import { Todo } from '../../models/Todo'
import { getAllTodos } from '../../api/todos'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  setTodos: Dispatch<SetStateAction<Todo[]>>
}

export const GetAllTodosSection = ({ setTodos }: Props) => {
  const handleGetAllTodos = async () => {
    const todos = await getAllTodos()
    setTodos(todos)
  }

  return (
    <Container>
      <Button variant='contained' onClick={handleGetAllTodos} className='w-fit'>
        Get All Todos
      </Button>
    </Container>
  )
}
