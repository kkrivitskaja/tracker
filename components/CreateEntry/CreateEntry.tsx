/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client'

import { useRouter } from 'next/navigation'

import Button from '~components/Button'
import { createNewEntry } from '~utils/api'
import updateCacheForPaths from '~utils/revalidateCache'

function CreateEntry() {
  const router = useRouter()
  const handleClick = async () => {
    const data = await createNewEntry()
    updateCacheForPaths(['/journal'])
    router.push(`/journal/${data.id}`)
  }

  return <Button onClick={handleClick}>+ Add</Button>
}

export default CreateEntry
