import { Fragment } from 'react'

import CreateEntry from '~components/CreateEntry'
import EntryCard from '~components/EntryCard/EntryCard'
import { Entry } from '~components/EntryCard/utils'
import { getUserFromClerkID } from '~utils/auth'
import prisma from '~utils/prisma'

const getEntries = async (): Promise<Entry[]> => {
  const user = await getUserFromClerkID()
  const data = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      analysis: true,
    },
  })

  return data
}

const JournalPage = async () => {
  const data = await getEntries()
  return (
    <div className="grid gap-4">
      <CreateEntry />
      {data?.map((entry) => (
        <Fragment key={entry.id}>
          <EntryCard entry={entry} />
        </Fragment>
      ))}
    </div>
  )
}

export default JournalPage
