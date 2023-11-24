'use client'

import { useCallback, useEffect, useState } from 'react'

import Search from '~components/Search/Search'
import SearchIcon from '~icons/search.svg'
import { askingQuestion } from '~utils/api'

import useDebounce from '../../hooks/useDebounce'
import useUrlStoredState from '../../hooks/useUrlStoredState'

function Question() {
  const [questionResult, setQuestionResult] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const { storedSearchParam, updateStoredSearchParam } = useUrlStoredState()

  const questionValue = storedSearchParam.get('q') || ''
  const placeholder = 'Ask a question about your mood'

  const handleAnswerSearch = useDebounce(
    useCallback(
      async (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.trim()

        if (!inputValue) {
          updateStoredSearchParam('q')
          return
        }

        setLoading(true)
        setError(null)

        if (inputValue !== questionValue) {
          updateStoredSearchParam('q', inputValue)
        }

        try {
          const result = await askingQuestion(inputValue)
          setQuestionResult(result)
        } catch (error) {
          setError(error as Error)
        } finally {
          setLoading(false)
        }
      },
      [questionValue, updateStoredSearchParam],
    ),
    300,
  )
  const handlePopState = useCallback(() => {
    const queryString: string = window.location.search
    const params = new URLSearchParams(queryString)
    const value = params.get('q')

    if (value) {
      updateStoredSearchParam('q', value)
    }
  }, [updateStoredSearchParam])

  // user navigates the session history
  useEffect(() => {
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [handlePopState])

  return (
    <>
      <Search icon={<SearchIcon />} placeholder={placeholder} value={questionValue} onChange={handleAnswerSearch} />
      {questionValue && (
        <div className="my-4 text-xl">
          {loading ? 'Loading...' : error ? error.message : questionResult && `Answer: ${questionResult}`}
        </div>
      )}
    </>
  )
}

export default Question
