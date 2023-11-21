import Link from 'next/link'

import styles from './EntryCard.module.scss'
import { Entry } from './utils'

export interface EntryCardProps {
  entry: Entry
}

function EntryCard({ entry }: EntryCardProps) {
  const date = new Date(entry.createdAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <li key={entry.id} className={styles.root}>
      <Link href={`/journal/${entry.id}`}>
        <div className={styles.cell}>{date}</div>
        <div className={styles.cell}>{entry.analysis?.subject}</div>
        <div className={styles.cell}>{entry.analysis?.mood}</div>
      </Link>
    </li>
  )
}

export default EntryCard
