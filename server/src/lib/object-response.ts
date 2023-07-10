import { Response } from 'express'
import { ZodIssue } from 'zod'
import { ErrorMessageOptions, generateErrorMessage } from 'zod-error'

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

export function generateErrorResponse(
  issues: ZodIssue[],
  options?: ErrorMessageOptions | undefined,
) {
  return generateErrorMessage(issues, {
    delimiter: {
      error: '#',
    },
    transform: ({ messageComponent }) => `${messageComponent}`,
  })
}
