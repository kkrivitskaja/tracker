import { loadQARefineChain } from 'langchain/chains'
import { Document } from 'langchain/document'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { OpenAI } from 'langchain/llms/openai'
import { OutputFixingParser, StructuredOutputParser } from 'langchain/output_parsers'
import { PromptTemplate } from 'langchain/prompts'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { z } from 'zod'

import { Entry } from '~components/EntryCard/utils'

type StructuredOutput = {
  mood: string
  subject: string
  negative: boolean
  summary: string
  color: string
  sentimentScore: number
}

type Entries = {
  id?: string
  createdAt: Date
  content: string
}

type PartialEntry = Pick<Entry, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'content'>

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z.string().describe('The mood of the person who wrote the journal entry.'),
    subject: z.string().describe('The subject of the journal entry.'),
    negative: z.boolean().describe('Is the journal entry negative? (i.e. does it contain negative emotions?).'),
    summary: z.string().describe('Quick summary of the entire entry.'),
    color: z
      .string()
      .describe(
        'A hexadecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.',
      ),
    sentimentScore: z
      .number()
      .describe(
        'sentiment of the text and rated on a sc ale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.',
      ),
  }),
)

const getPrompt = async (content: string): Promise<string> => {
  const formatInstructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions. \n{formatInstructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: {
      formatInstructions,
    },
  })
  const input = await prompt.format({
    entry: content,
  })
  return input
}

// eslint-disable-next-line import/prefer-default-export
export const analyzeEntry = async (entry: PartialEntry): Promise<StructuredOutput> => {
  const input = await getPrompt(entry.content)
  const model = new OpenAI({ temperature: 0 })
  const output = await model.call(input)

  try {
    return parser.parse(output)
  } catch {
    const fixParser = OutputFixingParser.fromLLM(new OpenAI({ temperature: 0 }), parser)
    const fix = await fixParser.parse(output)
    return fix
  }
}

export const askQuestion = async (question: string, entries: Entries[]): Promise<string> => {
  const docs = entries.map((entry) => {
    return new Document({
      pageContent: entry.content,
      metadata: { source: entry.id, date: entry.createdAt },
    })
  })

  const model = new OpenAI({ temperature: 0 })
  const chain = loadQARefineChain(model)
  // groups of vectors
  const embeddings = new OpenAIEmbeddings()
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
  const relevantDocs = await store.similaritySearch(question)

  const res = await chain.call({
    input_documents: relevantDocs,
    question,
  })

  return res.output_text
}
