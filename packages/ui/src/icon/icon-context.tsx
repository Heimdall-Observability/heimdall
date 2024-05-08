'use client'

import { createContext } from 'react'

import type { SizeVariantProps } from '../lib/common-cva'

interface ContextValue {
  contextSize?: SizeVariantProps
  className?: string
}

// Make sure the shape of the default value passed to
// createContext matches the shape that the consumers expect!
export const IconContext = createContext<ContextValue>({
  contextSize: 'small',
  className: '',
})
