import cn from 'classnames'
import Link, { LinkProps } from 'next/link'
import React, { FC, ComponentPropsWithoutRef, forwardRef } from 'react'

import styles from './LayoutNavigation.module.scss'

interface LayoutNavigationLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: LinkProps['href']
  as?: LinkProps['as']
  shallow?: LinkProps['shallow']
  replace?: LinkProps['replace']
  icon?: React.ReactNode
  endIcon?: React.ReactNode
  children?: React.ReactNode
  active?: boolean
  disabled?: boolean
  className?: string
}

const LayoutNavigationItem = forwardRef<HTMLLIElement, ComponentPropsWithoutRef<'li'>>(
  ({ className, children, ...props }, ref) => {
    return (
      <li ref={ref} role="menuitem" className={cn(styles.item, className)} {...props}>
        {children}
      </li>
    )
  },
)

const LayoutNavigationLink = forwardRef<HTMLAnchorElement, LayoutNavigationLinkProps>(
  ({ href, as, shallow, replace, children, icon, endIcon, active, disabled, ...props }) => {
    return (
      <Link
        href={href}
        as={as}
        shallow={shallow}
        replace={replace}
        className={cn(styles.link, { [styles.active]: active, [styles.disabled]: disabled })}
        {...props}
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        {children && <span className={styles.label}>{children}</span>}
        {endIcon && <span className={styles.endIcon}>{endIcon}</span>}
      </Link>
    )
  },
)

// eslint-disable-next-line react/function-component-definition
const LayoutNavigation: FC<React.PropsWithChildren<ComponentPropsWithoutRef<'nav'>>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <ul role="menubar" className={cn(styles.root, className)} {...props}>
      {children}
    </ul>
  )
}

export default Object.assign(LayoutNavigation, {
  Item: LayoutNavigationItem,
  Link: LayoutNavigationLink,
})
