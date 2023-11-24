import { OpenAI } from 'langchain/llms/openai'
import { StructuredOutputParser, OutputFixingParser } from 'langchain/output_parsers'
import { PromptTemplate } from 'langchain/prompts'
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
