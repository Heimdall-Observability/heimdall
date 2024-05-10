'use client'

import React, { ErrorInfo, useCallback } from 'react'
import { ErrorBoundary, ErrorBoundaryProps } from 'react-error-boundary'
import { send } from '../server'
import { formatError } from '../utils/format-error'

/**
 * MXLErrorBoundary is a wrapper for ErrorBoundary that will send errors to Safaricom MXL.
 *
 */
export function HeimdallErrorBoundary(props: ErrorBoundaryProps) {
  const queue = new Set()

  console.log(
    'Class: MXLErrorBoundary, Function: MXLErrorBoundary, Line 18 queue():',
    queue,
  )

  const captureException = useCallback(
    (error: Error, info?: React.ErrorInfo) => {
      if (info) {
        const component = info.componentStack.split('@')[0]
        const event = {
          level: 'error',
          data: { error },
          stack: info.componentStack,
          error: {
            message: error.message,
            name: error.name,
            cause: error.cause,
          },
          causedBy: component,
          message: `${error.name}: ${error.message}`,
        }
        queue.add(event)
      }

      const formattedError = formatError(error)
      const event = {
        level: 'error',
        data: { error },
        stack: info?.componentStack,
        error: {
          ...formattedError,
        },
        message: `${error.name}: ${error.message}`,
      }
      queue.add(event)
    },
    [],
  )

  // function flushEventsQueue() {
  //   const queue = window.lli.eventsQueue
  //   if (queue.size > 0) {
  //     send([...queue], undefined, undefined, '/vitals')
  //     queue.clear()
  //   }
  // }

  function handlerError(error: Error, info: ErrorInfo) {
    try {
      captureException(error, info)
      if (queue.size > 0) {
        send([...queue], undefined, undefined, '/error')
        queue.clear()
      }
    } catch (_e) {}
    props.onError?.(error, info)
  }

  return (
    <ErrorBoundary {...props} onError={handlerError}>
      {props.children}
    </ErrorBoundary>
  )
}
