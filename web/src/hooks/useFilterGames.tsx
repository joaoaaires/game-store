import { useContext } from 'react'
import { FilterGamesContext } from '@/contexts/filterGames'

export function useFilterGames() {
  return useContext(FilterGamesContext)
}
