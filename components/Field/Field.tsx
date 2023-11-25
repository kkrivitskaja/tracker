import cn from 'classnames'
import { AllHTMLAttributes, ElementType, cloneElement, FC, forwardRef } from 'react'

import Placeholder, { PlaceholderProps } from '~components/Placeholder/Placeholder'

import styles from './Field.module.scss'

export type CursorType = 'text' | 'pointer'

export type FieldProps = Prefer<
  {
    container?: ElementType
    as?: ElementType
    cursor?: CursorType
    icon?: JSX.Element
    iconAfter?: JSX.Element
    children?: JSX.Element
    placeholder?: JSX.Element
    error?: string
  },
  AllHTMLAttributes<HTMLElement>
>

export type SharedFieldProps = Pick<FieldProps, 'icon' | 'iconAfter' | 'error'>

type FieldComponent = FC<FieldProps> & {
  Placeholder: FC<PlaceholderProps>
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Field: FieldComponent = forwardRef<HTMLElement, FieldProps>(
  (
    { as: Element = 'div', cursor = 'pointer', icon, iconAfter, children, placeholder, error, className, ...props },
    ref,
  ) => {
    const rootClassName = cn(styles.field, styles[cursor], className)

    return (
      <Element ref={ref} className={rootClassName} {...props}>
        <div className={styles.container}>
          {icon && <span className={styles.icon}>{icon}</span>}
          {children && (
            <span className={styles.content}>
              {placeholder}
              {cloneElement(children, { ...children.props, className: cn(children.props?.className, styles.value) })}
            </span>
          )}
          {iconAfter && <span className={styles.iconAfter}>{iconAfter}</span>}
        </div>
        {error && <div className={styles.error}>{error}</div>}
      </Element>
    )
  },
)

Field.Placeholder = Placeholder

export default Field
