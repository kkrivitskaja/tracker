import { Fragment } from 'react'

import EntryCard from '~components/EntryCard/EntryCard'
import { Entry } from '~components/EntryCard/utils'
import EntryControls from '~components/EntryControls'
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
    <>
      <EntryControls />
      {data?.map((entry) => (
        <Fragment key={entry.id}>
          <EntryCard entry={entry} />
        </Fragment>
      ))}
    </>
  )
}

export default JournalPage
