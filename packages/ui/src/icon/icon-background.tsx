import type React from 'react'

export const IconBackground: React.FC<React.PropsWithChildren> = (props) => (
  <div className="bg-brand-300 border-brand-400 flex h-8 w-8 shrink-0 items-center justify-center rounded border">
    {props.children}
  </div>
)
