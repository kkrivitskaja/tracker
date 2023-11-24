import { ComponentPropsWithoutRef, forwardRef, useCallback } from 'react'

import styles from './Button.module.scss'

type ButtonBaseProps = ComponentPropsWithoutRef<'button'>

export interface ButtonProps extends ButtonBaseProps {
  icon?: JSX.Element
  endIcon?: JSX.Element
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ icon, children, endIcon, loading, type = 'button', style, className, onClick, disabled, ...props }, ref) => {
    const handleClick = useCallback(
      (ev: any) => {
        if (loading) return
        onClick?.(ev)
      },
      [loading, onClick],
    )

    return (
      <button ref={ref} type={type} className={styles.root} disabled={disabled} onClick={handleClick} {...props}>
        {icon && <span className={styles.before}>{icon}</span>}
        {children && <span className={styles.label}>{children}</span>}
        {endIcon && <span className={styles.after}>{endIcon}</span>}
      </button>
    )
  },
)

export default Button
