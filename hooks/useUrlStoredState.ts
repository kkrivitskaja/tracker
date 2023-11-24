import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

interface UrlStoredStateParams {
  storedSearchParam: URLSearchParams
  updateStoredSearchParam: (key: string, value?: string) => void
}

const useUrlStoredState = (): UrlStoredStateParams => {
  const router = useRouter()
  const storedSearchParam = useSearchParams()
  const pathname = usePathname()

  const createUpdatedStoredSearchParam = useCallback(
    (key: string, value?: string) => {
      const updatedSearchParams = new URLSearchParams(storedSearchParam.toString())

      if (value) {
        updatedSearchParams.set(key, value)
      } else {
        updatedSearchParams.delete(key)
      }

      return updatedSearchParams?.toString() || ''
    },
    [storedSearchParam],
  )

  const updateStoredSearchParam = (key: string, value?: string) => {
    router.push(`${pathname}?${createUpdatedStoredSearchParam(key, value)}`)
  }

  return { storedSearchParam, updateStoredSearchParam }
}
export default useUrlStoredState
