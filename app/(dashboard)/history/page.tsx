import { Analysis } from '~components/EntryCard/utils'
import HistoryChart from '~components/HistoryChart/HistoryChart'
import { getUserFromClerkID } from '~utils/auth'
import prisma from '~utils/prisma'

const getData = async () => {
  const user = await getUserFromClerkID()
  const analyses = await prisma.entryAnalysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  const totalAnalysis = analyses.reduce((acc: number, curr: Analysis) => {
    return acc + curr.sentimentScore
  }, 0)

  const average = Math.round(totalAnalysis / analyses.length)

  return { analyses, average }
}

async function History() {
  const { analyses, average } = await getData()

  return (
    <div className="h-full px-6 py-8">
      <div>
        <h1 className="text-2xl mb-4">{`Avg. Sentiment: ${average}`}</h1>
      </div>
      <div className="w-full h-[500px]">
        <HistoryChart data={analyses} />
      </div>
    </div>
  )
}

export default History
