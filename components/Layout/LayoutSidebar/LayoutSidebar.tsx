import cn from 'classnames'
import React, { FC, ComponentPropsWithoutRef } from 'react'

import styles from './LayoutSidebar.module.scss'

// eslint-disable-next-line react/function-component-definition
const LayoutSidebarHeader: FC<React.PropsWithChildren<React.ComponentPropsWithoutRef<'div'>>> = ({
  className,
  ...props
}) => {
  return <div className={cn(styles.header, className)} {...props} />
}

// eslint-disable-next-line react/function-component-definition
const LayoutSidebarBody: FC<React.PropsWithChildren<React.ComponentPropsWithoutRef<'div'>>> = ({
  className,
  ...props
}) => {
  return <div className={cn(styles.body, className)} {...props} />
}

// eslint-disable-next-line react/function-component-definition
const LayoutSidebarFooter: FC<React.PropsWithChildren<React.ComponentPropsWithoutRef<'div'>>> = ({
  className,
  ...props
}) => {
  return <div className={cn(styles.footer, className)} {...props} />
}

// eslint-disable-next-line react/function-component-definition
const LayoutSidebar: FC<React.PropsWithChildren<ComponentPropsWithoutRef<'aside'>>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <aside className={cn(styles.root, className)} {...props}>
      <nav className={styles.inner}>{children}</nav>
    </aside>
  )
}

export default Object.assign(LayoutSidebar, {
  Header: LayoutSidebarHeader,
  Body: LayoutSidebarBody,
  Footer: LayoutSidebarFooter,
})
