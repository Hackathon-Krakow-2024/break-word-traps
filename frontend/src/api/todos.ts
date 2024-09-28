import { Response, Todo } from '../models/Todo'

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7860'

export const getAllTodos = async () => {
  try {
    const response = await fetch(`${API}/todos`)
    const data: Response<Todo[]> = await response.json()
    return data.data
  } catch (e) {
    console.log(e)
    return []
  }
}

export const addTodo = async ({ title, content }: Omit<Todo, 'id'>) => {
  try {
    await fetch(`${API}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
      }),
    })
  } catch (e) {
    console.log(e)
  }
}

export const getTodoById = async (id: string | number) => {
  try {
    const response = await fetch(`${API}/todos/${id}`)
    const data: Response<Todo> = await response.json()
    return [data.data]
  } catch (e) {
    console.log(e)
    return []
  }
}

export const deleteTodoById = async (id: string | number) => {
  try {
    await fetch(`${API}/todos/${id}`, { method: 'DELETE' })
  } catch (e) {
    console.log(e)
  }
}

export const updateTodoById = async (todo: Todo) => {
  try {
    await fetch(`${API}/todos/${todo.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...todo, id: undefined }),
    })
  } catch (e) {
    console.log(e)
  }
}
