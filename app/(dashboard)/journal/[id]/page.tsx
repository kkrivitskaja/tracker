import { Entry } from '~components/EntryCard/utils'
import EntryEditor from '~components/EntryEditor/EntryEditor'
import { getUserFromClerkID } from '~utils/auth'
import prisma from '~utils/prisma'

const getEntry = async (id: string) => {
  const user = await getUserFromClerkID()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
  })
  return entry as Entry
}

const JournalEntryPage = async ({ params }: { params: { id: string } }) => {
  const entry = await getEntry(params.id)
  return <EntryEditor entry={entry} />
}

export default JournalEntryPage
