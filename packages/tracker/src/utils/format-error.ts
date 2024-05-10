import { AxiosErrorFormat, formatAxiosError } from './format-axios-error'

export function formatError(error: any): Error | AxiosErrorFormat {
  if (error?.isAxiosError) {
    return formatAxiosError(error)
  }
  return {
    name: error.name,
    message: error.message,
    stack: error.stack,
  }
}
