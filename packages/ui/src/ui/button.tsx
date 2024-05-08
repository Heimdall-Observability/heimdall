import { Slot } from '@radix-ui/react-slot'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import React from 'react'

import { IconLoader } from '../components/Icon/icons/IconLoader'
import { IconContext } from '../icon/icon-context'
import { cn } from '../lib'
import { sizes } from '../lib/common-cva'

export type ButtonVariantProps = VariantProps<typeof buttonVariants>
const buttonVariants = cva(
  `relative 
  flex inline-flex cursor-pointer
  items-center 
  items-center 
  justify-center 
  space-x-2 
  rounded-md 
  border 
  text-center 
  font-regular 
  outline-none
  outline-0 
  transition-all 
  duration-200 
  ease-out 
  focus-visible:outline-4
  focus-visible:outline-offset-1
  `,
  {
    variants: {
      type: {
        primary: `
            hover:bg-primary-60/80 border-primary bg-primary text-white
            shadow-sm
            focus-visible:outline-primary/60 dark:border-primary
            dark:bg-primary/70
            dark:hover:bg-primary`,
        secondary: `
            hover:text-border-stronger
            focus-visible:text-border-control hover:border-muted-background
            border-muted
            bg-foreground text-background
            shadow-sm
            focus-visible:outline-border`,
        default: `
            hover:bg-selection
            hover:dark:bg-selection border-control
            hover:border-strong dark:border-strong
            hover:dark:border-stronger focus-visible:outline-primary-600
            bg-muted text-foreground
            shadow-sm
            dark:bg-primary/30`,
        alternative: `
            border-primary-600
            bg-primary/10 text-primary
            shadow-sm
            hover:bg-primary/20
            focus-visible:border-primary/30
            focus-visible:outline-primary/60`,
        outline: `
            border
            bg-card
            text-foreground
            shadow-sm hover:border hover:text-accent-foreground
            focus-visible:outline-border`,
        dashed: `
            border-strong
            hover:border-stronger
            focus-visible:outline-border-strong
            border border-dashed
            bg-transparent
            text-foreground
            shadow-sm`,
        link: `
            focus-visible:outline-border-strong
            border
            border-transparent
            border-opacity-0
            bg-opacity-0
            text-primary/60 shadow-none
            hover:bg-primary/40
            dark:bg-opacity-0`,
        text: `
            focus-visible:outline-border-strong
            border-transparent
            text-foreground
            shadow-none
            hover:bg-muted/30`,
        danger: `
            border-destructive/70
            bg-destructive/20 text-destructive
            shadow-sm
            hover:border-destructive/90
            hover:bg-destructive/90
            hover:text-white
            focus-visible:outline-destructive/70`,
        warning: `
            text-amber
            hover:text-hi-contrast
            border-amber-700 bg-amber-200
            shadow-sm
            hover:border-amber-900
            hover:bg-amber-900
            focus-visible:outline-amber-700`,
      },
      block: {
        true: 'flex w-full items-center justify-center',
      },
      size: {
        ...sizes,
      },
      overlay: {
        base: `absolute inset-0 bg-background opacity-50`,
        container: `fixed inset-0 transition-opacity`,
      },
      disabled: {
        true: 'cursor-default opacity-50',
      },
      defaultVariants: {
        //   variant: 'default',
        //   size: 'default',
      },
    },
  },
)

export type LoadingVariantProps = VariantProps<typeof loadingVariants>
const loadingVariants = cva('', {
  variants: {
    loading: {
      default: '',
      true: `animate-spin`,
    },
  },
})

export interface ButtonProps
  // omit `type` as we use it to change type of button
  // replaced with `htmlType`
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>,
    // omit 'disabled' as it is included in HTMLButtonElement
    Omit<ButtonVariantProps, 'disabled'>,
    LoadingVariantProps {
  asChild?: boolean
  type?: ButtonVariantProps['type']
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
  icon?: React.ReactNode
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild = false,
      size = 'tiny',
      type = 'primary',
      children,
      loading,
      block,
      icon,
      iconRight,
      iconLeft,
      htmlType = 'button',
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    const { className, disabled } = props
    const showIcon = loading || icon
    const _iconLeft: React.ReactNode = icon ?? iconLeft
    props.disabled = loading ? true : props.disabled

    return (
      <Comp
        ref={ref}
        type={htmlType}
        {...props}
        className={cn(
          buttonVariants({
            type,
            size,
            disabled,
            block,
          }),
          className,
        )}
      >
        {asChild ? (
          React.isValidElement(children) ? (
            React.cloneElement(
              children,
              undefined,
              showIcon &&
                (loading ? (
                  <IconLoader
                    size={size}
                    className={cn(loadingVariants({ loading }))}
                  />
                ) : _iconLeft ? (
                  <IconContext.Provider value={{ contextSize: size }}>
                    {_iconLeft}
                  </IconContext.Provider>
                ) : null),
              children.props.children && (
                <span className={'truncate'}>{children.props.children}</span>
              ),
              iconRight && !loading && (
                <IconContext.Provider value={{ contextSize: size }}>
                  {iconRight}
                </IconContext.Provider>
              ),
            )
          ) : null
        ) : (
          <>
            {showIcon &&
              (loading ? (
                <IconLoader
                  size={size}
                  className={cn(loadingVariants({ loading }))}
                />
              ) : _iconLeft ? (
                <IconContext.Provider value={{ contextSize: size }}>
                  {_iconLeft}
                </IconContext.Provider>
              ) : null)}{' '}
            {children && <span className={'truncate'}>{children}</span>}{' '}
            {iconRight && !loading && (
              <IconContext.Provider value={{ contextSize: size }}>
                {iconRight}
              </IconContext.Provider>
            )}
          </>
        )}
      </Comp>
    )
  },
)

Button.displayName = 'Button'

export { Button, buttonVariants }
