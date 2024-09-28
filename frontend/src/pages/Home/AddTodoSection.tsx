import { Button, Container, Input } from '@mui/material'
import { addTodo, getAllTodos } from '../../api/todos'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { Todo } from '../../models/Todo'

type Props = {
  setTodos: Dispatch<SetStateAction<Todo[]>>
}

export const AddTodoSection = ({ setTodos }: Props) => {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')

  const handleAddTodo = async () => {
    await addTodo({ title, content })
    setTitle('')
    setContent('')
    const todos = await getAllTodos()
    setTodos(todos)
  }

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
  }

  const isButtonDisabled = !title || !content

  return (
    <Container className='flex gap-2'>
      <Button variant='contained' onClick={handleAddTodo} className='w-fit' disabled={isButtonDisabled}>
        Add TODO
      </Button>
      <Input placeholder='Title' className='w-fit' onChange={handleChangeTitle} value={title} />
      <Input placeholder='Content' className='w-fit' onChange={handleChangeContent} value={content} />
    </Container>
  )
}
