/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line import/no-extraneous-dependencies
import { DebounceSettings, DebouncedFunc } from 'lodash'
import debounce from 'lodash.debounce'
import { useCallback } from 'react'

type UseDebounce = <F extends (...args: any[]) => any>(
  fn: F,
  timeout: number,
  options?: DebounceSettings,
  deps?: any[],
) => DebouncedFunc<F>

const useDebounce: UseDebounce = (fn, timeout, options, deps = []) => {
  return useCallback(debounce(fn, timeout, options), deps)
}

export default useDebounce
