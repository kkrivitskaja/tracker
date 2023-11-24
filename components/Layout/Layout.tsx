import cn from 'classnames'
import { FC, ComponentPropsWithoutRef } from 'react'

import styles from './Layout.module.scss'
import LayoutContent from './LayoutContent'
import LayoutNavigation from './LayoutNavigation'
import LayoutSidebar from './LayoutSidebar'

// eslint-disable-next-line react/function-component-definition
const Layout: FC<React.PropsWithChildren<ComponentPropsWithoutRef<'div'>>> = ({ className, ...props }) => {
  return <div className={cn(styles.root, className)} {...props} />
}

export default Object.assign(Layout, {
  Sidebar: LayoutSidebar,
  Navigation: LayoutNavigation,
  Content: LayoutContent,
})
