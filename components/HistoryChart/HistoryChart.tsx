/* eslint-disable react-perf/jsx-no-new-object-as-prop */

'use client'

import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip, CartesianGrid, YAxis, TooltipProps } from 'recharts'
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent'

import { Analysis } from '~components/EntryCard/utils'

import { formatDate } from './utils'

const valueFormatter = (value: string) => value.toLocaleString()

const tickFormatter = (date: Date) => formatDate(date, '')

function CustomTooltip({ active, payload, label }: TooltipProps<ValueType, NameType>) {
  const dateLabel = tickFormatter(label)
  if (active && payload && payload.length > 0) {
    return (
      <div className="p-8 custom-tooltip bg-white/5 shadow-md border border-black/10 rounded-lg backdrop-blur-md relative">
        <p>{dateLabel}</p>
        <p>Mood: {payload[0].payload.mood}</p>
        <p>Sentiment score: {payload[0].payload.sentimentScore}</p>
      </div>
    )
  }

  return null
}

export interface HistoryCharProps {
  data: Analysis[]
}

function HistoryChart({ data }: HistoryCharProps) {
  return (
    <ResponsiveContainer width="100%" height={600}>
      <LineChart width={200} height={100} data={data}>
        <Line type="monotone" dataKey="sentimentScore" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={2} />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis tickFormatter={tickFormatter} dataKey="createdAt" />
        <YAxis scale="auto" tickFormatter={valueFormatter} />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default HistoryChart
