import styleHandler from '../theme/style-handler'
import { cn } from '../utils'

export default function InputIconContainer({ icon, className }: any) {
  const __styles = styleHandler('inputIconContainer')
  return <div className={cn(__styles.base, className)}>{icon}</div>
}
