import { NextResponse } from 'next/server'

import { analyzeEntry } from '~utils/ai'
import { getUserFromClerkID } from '~utils/auth'
import prisma from '~utils/prisma'

// eslint-disable-next-line import/prefer-default-export
export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
  try {
    const { content } = await request.json()

    if (!content || Object.keys(content).length === 0) {
      throw new Error('Invalid data provided for updating the journal entry.')
    }

    const user = await getUserFromClerkID()

    const updatedEntry = await prisma.journalEntry.update({
      where: {
        userId_id: {
          userId: user.id,
          id: params.id,
        },
      },
      data: content,
    })

    const analysis = await analyzeEntry(updatedEntry)
    const updatedAnalysis = await prisma.entryAnalysis.upsert({
      where: {
        entryId: updatedEntry.id,
      },
      update: {
        ...analysis,
      },
      create: {
        entryId: updatedEntry.id,
        userId: user.id,
        ...analysis,
      },
    })

    return NextResponse.json({ data: { ...updatedEntry, analysis: updatedAnalysis } })
  } catch (error) {
    console.error('Error updating journal entry:', error)

    return NextResponse.json({
      status: 500,
      statusText: 'Internal Server Error',
      body: 'An error occurred while updating the journal entry.',
    })
  }
}
