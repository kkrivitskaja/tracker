import Link from 'next/link'

import CreateEntry from '~components/CreateEntry/CreateEntry'
import EntryCard from '~components/EntryCard/EntryCard'
import { getUserFromClerkID } from '~utils/auth'
import prisma from '~utils/prisma'

const getEntries = async () => {
  const user = await getUserFromClerkID()
  const data = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return data
}

const JournalPage = async () => {
  const data = await getEntries()
  return (
    <div className="grid grid-cols-3 gap-4">
      <CreateEntry />
      {data?.map((entry) => (
        <div key={entry.id}>
          <Link href={`/journal/${entry.id}`}>
            <EntryCard entry={entry} />
          </Link>
        </div>
      ))}
    </div>
  )
}

export default JournalPage
