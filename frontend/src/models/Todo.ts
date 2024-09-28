export type Response<T> = {
  message: string
  data: T
}

export type ErrorResponse = {
  detail: string
}

export type Todo = {
  title: string
  content: string
  id: string | number
}
