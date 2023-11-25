import cn from 'classnames'
import React, { HTMLAttributes } from 'react'

import EntryCard from '~components/EntryCard'

import styles from './EntriesGroup.module.scss'

type EntriesGroupProps = HTMLAttributes<HTMLUListElement>

function EntriesGroup({ className, children }: EntriesGroupProps) {
  return <ul className={cn(styles.root, className)}>{children}</ul>
}

export default Object.assign(EntriesGroup, {
  Item: EntryCard,
})
