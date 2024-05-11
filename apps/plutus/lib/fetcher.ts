const controller: AbortController = new AbortController()

const fetcher = async (
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> => {
  const res = await fetch(input, { ...init, signal: controller.signal })

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error('Error occurred, please try again.') as Error & {
      info: any
      status: number
    }
    // Attach extra info to the error object.
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return res.json()
}

export default fetcher
