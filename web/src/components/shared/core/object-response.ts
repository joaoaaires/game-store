export default interface ObjectResponse<T> {
  status: number
  data?: T | null
  message?: string | null
}
