'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { ReactNode } from 'react'

import Conditional from '@/components/conditional'
import { Icons } from '@/components/icons'
import { Button } from '@heimdall-logs/ui'
import errorStack from 'error-stack-parser'

function ErrorPage({
  error,
  title,
  subtitle,
  action,
}: {
  error?: Error
  title?: string
  subtitle?: string | ReactNode
  statusCode?: number
  action?: () => void
}) {
  const hasError = !!error && process.env.NODE_ENV === 'development'
  const frames = errorStack.parse(error as Error)

  return (
    <>
      <noscript>
        <div
          style={{
            backgroundColor: 'black',
            color: 'white',
            padding: 30,
          }}
        >
          <h1 style={{ fontSize: '2em' }}>{title}</h1>
          <p style={{ fontSize: '1.5em' }}>{subtitle}</p>
          <small>
            Also, this site works much better with JavaScript enabled...
          </small>
        </div>
      </noscript>
      <main className="flex h-screen w-screen items-center bg-gray-100">
        <div className="container flex flex-col items-center justify-center px-5 text-gray-700 md:flex-row">
          <div className="max-w-screen-md">
            {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
            {/*<div className='font-dark text-5xl font-bold'>{statusCode}</div>*/}
            <p className="text-xl font-light leading-normal md:text-3xl">
              {title}{' '}
            </p>
            <p className="font-light leading-normal text-muted-foreground">
              There is a bug on the page you were viewing. Please try reload the
              application or you can report this to the service availability{' '}
              <Link
                className="text-blue-500 underline"
                href="mailto:francismasha96@gmail.com"
              >
                here
              </Link>
              .
            </p>
            <p className="my-4">{subtitle}</p>
            <Conditional condition={hasError}>
              <div className="mb-8 h-96 overflow-auto rounded-md border border-dashed border-destructive p-4">
                <p className="font-semibold uppercase">Stack trace details:</p>
                {frames.map((frame) => (
                  <div
                    key={[
                      frame.fileName,
                      frame.lineNumber,
                      frame.columnNumber,
                    ].join('-')}
                    className="pt-4"
                  >
                    <div className="pt-2">{frame.functionName}</div>
                    <div className="opacity-75">
                      {frame.fileName}:{frame.lineNumber}:{frame.columnNumber}
                    </div>
                  </div>
                ))}
              </div>
            </Conditional>

            <Button onClick={action}>
              <Icons.reload className="mr-2 h-4 w-4" /> Reload
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}

function NotFoundErrorPage({
  title,
  subtitle,
  action,
}: {
  title?: string
  subtitle?: string | ReactNode
  statusCode?: number
  action?: () => void
}) {
  return (
    <>
      <noscript>
        <div
          style={{
            backgroundColor: 'black',
            color: 'white',
            padding: 30,
          }}
        >
          <h1 style={{ fontSize: '2em' }}>{title}</h1>
          <p style={{ fontSize: '1.5em' }}>{subtitle}</p>
          <small>
            Also, this site works much better with JavaScript enabled...
          </small>
        </div>
      </noscript>
      <main className="flex h-screen w-screen items-center bg-gray-100">
        <div className="container flex flex-col items-center justify-center px-5 text-gray-700 md:flex-row">
          <div className="max-w-screen-md">
            <p className="text-2xl font-light leading-normal md:text-3xl">
              {title}{' '}
            </p>
            <p className="my-4 text-xl">{subtitle}</p>
            <Button onClick={action}>Go back</Button>
          </div>
        </div>
      </main>
    </>
  )
}

function FourOhFour() {
  const { back } = useRouter()
  const pathname = usePathname()
  return (
    <NotFoundErrorPage
      statusCode={404}
      title={'Oh no, this page might be missing.'}
      subtitle={`So sorry. "${pathname}" is not found on Safaricom Onboarding Service.`}
      action={back}
    />
  )
}

function ServerError({ error, reset }: { error?: Error; reset: () => void }) {
  return (
    <ErrorPage
      statusCode={500}
      error={error}
      title={'Oh no, something did not go well.'}
      subtitle={<span className="text-red-500">{error?.message}</span>}
      action={reset}
    />
  )
}

export { ErrorPage, ServerError, FourOhFour }
