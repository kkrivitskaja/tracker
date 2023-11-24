import cn from 'classnames'
import { FC, memo } from 'react'

import styles from '~components/Field/Field.module.scss'

export interface PlaceholderProps {
  value: string
  shown?: boolean
  className?: string
}

// eslint-disable-next-line react/function-component-definition
const Placeholder: FC<PlaceholderProps> = ({ value, shown, className }) => {
  return shown && value ? <span className={cn(styles.placeholder, className)}>{value}</span> : null
}

export default memo(Placeholder)
