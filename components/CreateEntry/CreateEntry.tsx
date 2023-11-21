/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client'

import { useRouter } from 'next/navigation'

import { createNewEntry } from '~utils/api'
import updateCacheForPaths from '~utils/revalidateCache'

function CreateEntry() {
  const router = useRouter()
  const handleClick = async () => {
    const data = await createNewEntry()
    updateCacheForPaths(['/journal'])
    router.push(`/journal/${data.id}`)
  }
  // FIXME:move to the reusable button
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow" onClick={handleClick}>
      <div className="px-4 py-5 sm:p-6">
        <span className="text-3xl">New Entry</span>
      </div>
    </div>
  )
}

export default CreateEntry
