import { NextRequest, NextResponse } from 'next/server'

import { askQuestion } from '~utils/ai'
import { getUserFromClerkID } from '~utils/auth'
import prisma from '~utils/prisma'

// eslint-disable-next-line import/prefer-default-export
export const POST = async (request: NextRequest) => {
  const { question } = await request.json()
  try {
    if (typeof question !== 'string') {
      throw new TypeError('Question is not a string in POST.')
    }
    const user = await getUserFromClerkID()
    const entries = await prisma.journalEntry.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    })
    const answer = await askQuestion(question, entries)

    return NextResponse.json({ data: answer })
  } catch (error) {
    console.error('Error searching answer on question:', error)
    return NextResponse.json({
      status: 500,
      statusText: 'Internal Server Error',
      body: 'An error occurred while searching answer on question.',
    })
  }
}
