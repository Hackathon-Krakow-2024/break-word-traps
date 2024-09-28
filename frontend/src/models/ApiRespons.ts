export type Response<T> = {
  message: string
  data: T
}

export type ErrorResponse = {
  detail: string
}
