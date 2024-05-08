'use client'

import type { CSSProperties, ReactNode } from 'react'

import { cn } from '../../lib'
import styleHandler from '../../lib/theme/style-handler'
import { H5 } from '../typography'
import { MenuContextProvider, useMenuContext } from './MenuContext'

interface MenuProps {
  children: ReactNode
  className?: string
  ulClassName?: string
  style?: CSSProperties
  type?: 'text' | 'pills' | 'border'
}

function Menu({
  children,
  className,
  ulClassName,
  style,
  type = 'text',
}: MenuProps) {
  return (
    <nav
      role="menu"
      aria-label="Sidebar"
      aria-orientation="vertical"
      aria-labelledby="options-menu"
      className={className}
      style={style}
    >
      <MenuContextProvider type={type}>
        <ul className={ulClassName}>{children}</ul>
      </MenuContextProvider>
    </nav>
  )
}

interface ItemProps {
  children: ReactNode
  icon?: ReactNode
  active?: boolean
  rounded?: boolean
  onClick?: any
  doNotCloseOverlay?: boolean
  showActiveBar?: boolean
  style?: CSSProperties
}

export function Item({
  children,
  icon,
  active,
  rounded,
  onClick,
  doNotCloseOverlay = false,
  showActiveBar = false,
  style,
}: ItemProps) {
  const __styles = styleHandler('menu')

  const { type } = useMenuContext()

  const classes = [__styles.item.base]

  classes.push(__styles.item.variants[type].base)

  if (active) {
    classes.push(__styles.item.variants[type].active)
  } else {
    classes.push(__styles.item.variants[type].normal)
  }

  const contentClasses = [__styles.item.content.base]
  if (active) {
    contentClasses.push(__styles.item.content.active)
  } else {
    contentClasses.push(__styles.item.content.normal)
  }

  const iconClasses = [__styles.item.icon.base]
  if (active) {
    iconClasses.push(__styles.item.icon.active)
  } else {
    iconClasses.push(__styles.item.icon.normal)
  }

  return (
    <li
      role="menuitem"
      className={cn('outline-none', classes)}
      style={style}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
    >
      {icon && (
        <div className={`${iconClasses.join(' ')} min-w-fit`}>{icon}</div>
      )}
      <span className={contentClasses.join(' ')}>{children}</span>
    </li>
  )
}

interface GroupProps {
  children?: ReactNode
  icon?: ReactNode
  title: any
}

export function Group({ children, icon, title }: GroupProps) {
  const __styles = styleHandler('menu')
  const { type } = useMenuContext()
  return (
    <div className={cn(__styles.group.base, __styles.group.variants[type])}>
      {icon && <span className={__styles.group.icon}>{icon}</span>}
      <span className={__styles.group.content}>{title}</span>
      {children}
    </div>
  )
}

interface MiscProps {
  children: ReactNode
}

export function Misc({ children }: MiscProps) {
  return (
    <H5 className="text-muted-foreground">
      <span>{children}</span>
    </H5>
  )
}

Menu.Item = Item
Menu.Group = Group
Menu.Misc = Misc
export default Menu
