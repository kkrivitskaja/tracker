import { ReactNode } from 'react'

import styles from './EntriesList.module.scss'

interface EntriesListProps {
  placeholder?: string
  empty?: boolean
  children: ReactNode
}

function EntriesList({ placeholder, empty, children }: EntriesListProps) {
  return (
    <div className={styles.root}>
      {empty && <div>{placeholder}</div>}
      {children}
    </div>
  )
}

export default EntriesList
