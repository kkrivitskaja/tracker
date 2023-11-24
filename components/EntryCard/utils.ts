export type Analysis = {
  id: string
  createdAt: Date
  updatedAt: Date
  entryId: string
  userId: string
  mood: string
  subject: string
  negative: boolean
  summary: string
  color: string
  sentimentScore: number
}

export type Entry = {
  id: string
  userId: string
  createdAt: Date
  updatedAt: Date
  content: string
  analysis?: Analysis | null
}
