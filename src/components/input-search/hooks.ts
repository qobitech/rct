import { useEffect, useMemo, useState } from 'react'
import { ISearchResult } from '.'
import useDebounce from '../hooks'

export interface IUseInputSearch {
  results: ISearchResult[]
  setSearchTerm: React.Dispatch<React.SetStateAction<string | number>>
  setResults: React.Dispatch<React.SetStateAction<ISearchResult[]>>
  setSelected: React.Dispatch<React.SetStateAction<string | number>>
  searchTerm: string | number
}

export const useInputSearch = (
  fetchResults: (
    searchValue: string | number,
    setResults?: (value: ISearchResult[]) => void
  ) => void
): IUseInputSearch => {
  const [searchTerm, setSearchTerm] = useState<string | number>('')
  const [selected, setSelected] = useState<string | number>('')
  const [results, setResults] = useState<ISearchResult[]>([])
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const getResults = useMemo(() => {
    if (!searchTerm) return results
    return results.filter((i) =>
      i.label.toLowerCase().includes(searchTerm.toString().toLowerCase())
    )
  }, [searchTerm, results])

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchResults(debouncedSearchTerm, setResults)
    }
  }, [debouncedSearchTerm, fetchResults])

  return {
    results: getResults,
    setSearchTerm,
    setResults,
    searchTerm: searchTerm || selected,
    setSelected
  }
}
