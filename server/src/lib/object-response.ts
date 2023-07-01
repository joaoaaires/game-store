import { Response } from 'express'

interface ObjectResponse<T> {
  status: number
  data?: T | null
  message?: string | null
}

export function generateObjectResponse<T>(
  res: Response,
  props: ObjectResponse<T>,
): Response {
  return res.status(props.status).json({
    status: props.status,
    data: props.data,
    message: props.message,
  })
}
