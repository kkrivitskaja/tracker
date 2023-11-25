'use server'

import { revalidatePath } from 'next/cache'

const updateCacheForPaths = (paths: string[] = []): void => {
  paths.forEach((path) => {
    revalidatePath(path)
  })
}

export default updateCacheForPaths
