import cn from 'classnames'
import { ComponentPropsWithoutRef, FC } from 'react'

import styles from './LayoutContent.module.scss'

// eslint-disable-next-line react/function-component-definition
const LayoutHeader: FC<React.PropsWithChildren<ComponentPropsWithoutRef<'header'>>> = ({ className, ...props }) => {
  return <header className={cn(styles.header, className)} {...props} />
}

// eslint-disable-next-line react/function-component-definition
const LayoutBody: FC<React.PropsWithChildren<ComponentPropsWithoutRef<'main'>>> = ({ className, ...props }) => {
  return <main className={cn(styles.body, className)} {...props} />
}

// eslint-disable-next-line react/function-component-definition
const LayoutContent: FC<React.PropsWithChildren<ComponentPropsWithoutRef<'div'>>> = ({ className, ...props }) => {
  return <div {...props} className={cn(styles.root, className)} />
}

export default Object.assign(LayoutContent, {
  Header: LayoutHeader,
  Body: LayoutBody,
})
