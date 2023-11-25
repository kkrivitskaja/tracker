import { Fragment } from 'react'

import EntriesGroup from '~components/EntriesGroup'
import EntriesList from '~components/EntriesList'
import EntryCard from '~components/EntryCard'
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
      <EntriesList empty={data.length === 0} placeholder={data.length === 0 ? 'Add a new entry' : 'null'}>
        <EntriesGroup>
          {data?.map((entry) => (
            <Fragment key={entry.id}>
              <EntryCard entry={entry} />
            </Fragment>
          ))}
        </EntriesGroup>
      </EntriesList>
    </>
  )
}

export default JournalPage
