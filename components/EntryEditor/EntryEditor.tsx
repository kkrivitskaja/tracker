/* eslint-disable react-perf/jsx-no-new-object-as-prop */

'use client'

import { useCallback, useState } from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useAutosave } from 'react-autosave'

import { Entry } from '~components/EntryCard/utils'
import { updateEntry } from '~utils/api'
import updateCacheForPaths from '~utils/revalidateCache'

export interface EntryEditorProps {
  entry: Entry
}

function EntryEditor({ entry }: EntryEditorProps) {
  const [content, setContent] = useState<string>(entry?.content)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [currentEntry, setCurrentEntry] = useState<Entry>(entry)

  useAutosave({
    data: content,
    // _content the latest version
    onSave: async (_content: string) => {
      if (_content === entry.content) {
        return setIsSaving(true)
      }

      const { data } = await updateEntry(entry.id, { content: _content })
      setCurrentEntry(data)
      setIsSaving(false)
      updateCacheForPaths(['/journal'])
      return null
    },
  })

  const handleContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }, [])

  return (
    <div className="w-full h-full grid grid-cols-3 gap-0 relative">
      <div className="absolute left-0 top-0 p-2">
        {isSaving ? (
          <div className="w-[16px] h-[16px] rounded-full animate-spin border border-solid border-yellow-500 border-t-transparent" />
        ) : (
          <div className="w-[16px] h-[16px] rounded-full bg-green-500" />
        )}
      </div>
      <div className="col-span-2">
        <textarea className="p-8 text-xl" value={content} onChange={handleContentChange} />
      </div>
      <div className="border-l border-black/5">
        <div className="h-[100px] p-8 border-b border-b-gray-200" style={{ background: currentEntry?.analysis?.color }}>
          <h2 className="text-2xl text-black ">Analysis</h2>
        </div>
        <div>
          <ul className="divide-y divide-gray-200">
            <li className="py-4 px-8 flex items-center justify-between">
              <div className="text-xl font-semibold w-1/3">Summary</div>
              <div className="text-xl">Summary</div>
            </li>
            <li className="py-4 px-8 flex items-center justify-between">
              <div className="text-xl font-semibold w-1/3">Subject</div>
              <div className="text-xl">Subject</div>
            </li>

            <li className="py-4 px-8 flex items-center justify-between">
              <div className="text-xl font-semibold">Mood</div>
              <div className="text-xl">Mood</div>
            </li>

            <li className="py-4 px-8 flex items-center justify-between">
              <div className="text-xl font-semibold">Negative</div>
              <div className="text-xl">Negative</div>
            </li>
            <li className="py-4 px-8 flex items-center justify-between" />
          </ul>
        </div>
      </div>
    </div>
  )
}

export default EntryEditor
