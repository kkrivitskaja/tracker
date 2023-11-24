'use client'

import { ChangeEventHandler, FocusEventHandler } from 'react'

import Field from '~components/Field'

import { useSearchState } from './utils'

export interface SearchProps {
  id?: string
  name?: string
  value?: string
  defaultValue?: string
  placeholder?: string
  disabled?: boolean
  className?: string
  icon?: JSX.Element
  onFocus?: FocusEventHandler<HTMLInputElement>
  onBlur?: FocusEventHandler<HTMLInputElement>
  onChange?: ChangeEventHandler<HTMLInputElement>
}

function Search({
  id,
  name,
  value,
  defaultValue,
  placeholder,
  disabled,
  className,
  icon,
  onFocus,
  onBlur,
  onChange,
}: SearchProps) {
  const searchState = useSearchState({
    value,
    defaultValue,
    onChange,
  })

  const placeholderElement = (
    <Field.Placeholder value={placeholder as string} shown={!!placeholder && !searchState.search} />
  )
  return (
    <Field icon={icon} as="label" cursor="text" htmlFor={id} className={className} placeholder={placeholderElement}>
      <input
        id={id}
        type="search"
        value={searchState.search}
        defaultValue={defaultValue}
        name={name}
        disabled={disabled}
        onChange={searchState.onSearch}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </Field>
  )
}

export default Search
