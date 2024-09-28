import { Card, CardHeader, IconButton, Stack, Typography } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Todo } from '../../models/Todo'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { deleteTodoById, getAllTodos, updateTodoById } from '../../api/todos'

type Props = {
  todo: Todo
  todos: Todo[]
  setTodos: Dispatch<SetStateAction<Todo[]>>
}

export const TodoCard = ({ todo, todos, setTodos }: Props) => {
  const { id, title, content } = todo
  const [titleValue, setTitleValue] = useState<string>(title ?? '')
  const [contentValue, setContentValue] = useState<string>(content ?? '')
  const [isEditable, setIsEditable] = useState(false)

  const handleChangeEditable = () => {
    setIsEditable(!isEditable)
  }

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value)
  }

  const handleChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
    setContentValue(e.target.value)
  }

  const handleCancelEdit = () => {
    setTitleValue(title ?? '')
    setContentValue(content ?? '')
    setIsEditable(false)
  }

  const handleSaveEdit = async () => {
    setIsEditable(false)
    await updateTodoById({ id: id ?? '', title: titleValue, content: contentValue })
    const updatedTodos = [...todos]
    const index = updatedTodos.findIndex(todo => todo.id === id)
    updatedTodos[index] = { ...updatedTodos[index], title: titleValue, content: contentValue }
    setTodos(updatedTodos)
  }

  const handleDeleteTodoById = async () => {
    await deleteTodoById(id)
    const todos = await getAllTodos()
    setTodos(todos)
  }

  return (
    <Card className='flex flex-col gap-1 p-2'>
      <CardHeader
        action={
          <Stack direction='row' gap={1}>
            {isEditable ? (
              <>
                <IconButton onClick={handleCancelEdit} aria-label='cancel edit'>
                  <ClearIcon htmlColor='red' />
                </IconButton>
                <IconButton onClick={handleSaveEdit} aria-label='save edit'>
                  <CheckIcon htmlColor='green' />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton onClick={handleDeleteTodoById} aria-label='delete'>
                  <DeleteIcon htmlColor='red' />
                </IconButton>
                <IconButton onClick={handleChangeEditable} aria-label='edit'>
                  <EditIcon />
                </IconButton>
              </>
            )}
          </Stack>
        }
      />
      <Typography>{`{`}</Typography>
      <div className='flex gap-2 pl-2'>
        <Typography className='text-emerald-300'>"id":</Typography>{' '}
        <Typography className='text-sky-400'>{id}</Typography>
      </div>
      <div className='flex gap-2 pl-2'>
        <Typography className='text-emerald-300'>"title":</Typography>
        <Typography className={isEditable ? '' : 'text-blue-300'}>
          "
          <input
            disabled={!isEditable}
            onChange={handleChangeTitle}
            value={titleValue}
            className={isEditable ? 'bg-slate-200' : 'outline-none'}
            style={{
              width: `${titleValue.length}ch`,
            }}
          />
          "
        </Typography>
      </div>
      <div className='flex gap-2 pl-2'>
        <Typography className='text-emerald-300'>"content":</Typography>
        <Typography className={isEditable ? '' : 'text-blue-300'}>
          "
          <input
            disabled={!isEditable}
            onChange={handleChangeContent}
            value={contentValue}
            className={isEditable ? 'box-border bg-slate-200' : 'outline-none'}
            style={{
              width: `${contentValue.length}ch`,
            }}
          />
          "
        </Typography>
      </div>
      <Typography>{`}`}</Typography>
    </Card>
  )
}
