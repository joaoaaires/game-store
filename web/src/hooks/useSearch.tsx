import { useContext } from 'react'
import { SearchContext } from '@/contexts/search'

export function useSearch() {
  return useContext(SearchContext)
}
