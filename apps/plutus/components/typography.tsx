import { type ElementType, type ReactNode, createElement } from 'react'

import { cn } from '@/lib/utils'

type TitleProps = {
  variant?: 'primary' | 'secondary'
  as?: ElementType
  className?: string
  id?: string
} & (
  | { children: ReactNode }
  | {
      dangerouslySetInnerHTML: {
        __html: string
      }
    }
)

const fontSize = {
  h1: 'font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl',
  h2: 'font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
  h3: 'font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl',
  h4: 'text-xl md:text-2xl',
  h5: 'text-lg md:text-xl',
  h6: 'text-lg font-medium',
}

const titleColors = {
  primary: 'text-black dark:text-white',
  secondary: 'text-gray-500 dark:text-slate-400',
}

function Title({
  variant = 'primary',
  size,
  as,
  className,
  ...rest
}: TitleProps & { size: keyof typeof fontSize }) {
  const Tag = as ?? size
  return (
    <Tag
      className={cn(fontSize[size], titleColors[variant], className)}
      {...rest}
    />
  )
}

function H1(props: TitleProps) {
  return <Title {...props} size="h1" />
}

function H2(props: TitleProps) {
  return <Title {...props} size="h2" />
}

function H3(props: TitleProps) {
  return <Title {...props} size="h3" />
}

function H4(props: TitleProps) {
  return <Title {...props} size="h4" />
}

function H5(props: TitleProps) {
  return <Title {...props} size="h5" />
}

function H6(props: TitleProps) {
  return <Title {...props} size="h6" />
}

type ParagraphProps = {
  className?: string
  prose?: boolean
  textColorClassName?: string
  as?: ElementType
} & (
  | { children: ReactNode }
  | {
      dangerouslySetInnerHTML: { __html: string }
    }
)

function Paragraph({
  className,
  prose = true,
  as = 'p',
  textColorClassName = 'text-secondary',
  ...rest
}: ParagraphProps) {
  return createElement(as, {
    className: cn('max-w-full text-lg', textColorClassName, className, {
      'prose prose-light dark:prose-dark': prose,
    }),
    ...rest,
  })
}

export { H1, H2, H3, H4, H5, H6, Paragraph }
