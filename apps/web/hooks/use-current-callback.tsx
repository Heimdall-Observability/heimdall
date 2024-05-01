import { useCallback, useRef } from 'react'

export const useCurrentCallback = <T extends (...args: any[]) => any>(
  callback: T,
) => {
  const callbackRef = useRef(callback)
  callbackRef.current = callback
  return useCallback((...args: any[]) => callbackRef.current(...args), [])
}
