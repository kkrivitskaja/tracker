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
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:px-6">{date}</div>
      <div className="px-4 py-5 sm:p-6">summary</div>
      <div className="px-4 py-4 sm:px-6">entry.analysis?.mood</div>
    </div>
  )
}

export default EntryCard
