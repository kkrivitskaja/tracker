import { Entry } from '~components/EntryCard/utils'

type Content = { content: string }

const createURL = (path: string): string => `${window.location.origin}${path}`
// eslint-disable-next-line import/prefer-default-export
export const createNewEntry = async (): Promise<Entry> => {
  const res = await fetch(
    new Request(createURL('/api/entry'), {
      method: 'POST',
      body: JSON.stringify({ content: 'new entry' }),
    }),
  )
  if (!res.ok) {
    throw new Error('Failed to add a new entry')
  }
  const data = await res.json()
  return data.data
}

export const updateEntry = async (id: string, content: Content) => {
  const res = await fetch(new Request(createURL(`/api/entry/${id}`)), {
    method: 'PATCH',
    body: JSON.stringify({ content }),
  })
  if (!res.ok) {
    throw new Error('Error updating the entry')
  }

  const data = await res.json()

  return data
}
