import { auth } from '@clerk/nextjs'

import prisma from './prisma'

// eslint-disable-next-line import/prefer-default-export
export const getUserFromClerkID = async () => {
  const { userId } = auth()
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId as string,
    },
  })

  return user
}
