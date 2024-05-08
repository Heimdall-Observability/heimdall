import type React from 'react'

import { IconAlertCircle } from '../../components/Icon/icons/IconAlertCircle'
import styleHandler from '../theme/style-handler'

interface Props {
  style?: React.CSSProperties
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge'
}

export default function InputErrorIcon({ style, size }: Props) {
  const __styles = styleHandler('inputErrorIcon')

  return (
    <div className={__styles.base} style={style}>
      <IconAlertCircle size={size} strokeWidth={2} className="" />
    </div>
  )
}
