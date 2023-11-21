import { NextRequest, NextResponse } from 'next/server'

import { getUserFromClerkID } from '~utils/auth'
import prisma from '~utils/prisma'

interface CreateJournalEntryData {
  userId: string
  content: string
}

// eslint-disable-next-line import/prefer-default-export
export const POST = async (request: NextRequest) => {
  try {
    const data: CreateJournalEntryData = await request.json()
    if (!data.content) {
      throw new Error('Content is required for a journal entry.')
    }

    const user = await getUserFromClerkID()
    const entry = await prisma.journalEntry.create({
      data: {
        userId: user.id,
        content: 'Cool journal entry',
      },
    })

    return NextResponse.json({ data: entry })
  } catch (error) {
    console.error('Error creating journal entry:', error)

    return NextResponse.json({
      status: 500,
      statusText: 'Internal Server Error',
      body: 'An error occurred while creating the journal entry.',
    })
  }
}
