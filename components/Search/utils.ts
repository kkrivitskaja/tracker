import { ChangeEvent, ChangeEventHandler, useCallback, useState } from 'react'
import { useUpdateEffect } from 'react-use'

type SearchStateProps = {
  value?: string
  defaultValue?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}
// eslint-disable-next-line import/prefer-default-export
export const useSearchState = ({ value, defaultValue = '', onChange }: SearchStateProps) => {
  const [state, setState] = useState(defaultValue || value || '')
  const [search, setSearch] = useState(value || '')

  useUpdateEffect(() => {
    if (value && value !== search) setSearch(value)
  }, [value])

  const onSearch = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      setState(ev.currentTarget.value)
      setSearch(ev.currentTarget.value)
      onChange?.(ev)
    },
    [onChange],
  )

  return {
    state,
    search,
    onSearch,
  }
}
