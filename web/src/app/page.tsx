import { GamesFilter } from '@/components/GamesFilter'
import { GamesList } from '@/components/GamesList'
import { FilterGamesContextProvider } from '@/contexts/filterGames'

export default function Home() {
  return (
    <div className="relative h-full ">
      <FilterGamesContextProvider>
        <div className="absolute left-0 top-0 h-full w-2/12 bg-black-400 text-black-900">
          <GamesFilter />
        </div>
        <div
          id="myscroll"
          className="absolute right-0 top-0 h-full w-10/12 overflow-y-scroll bg-white"
        >
          <GamesList />
        </div>
      </FilterGamesContextProvider>
    </div>
  )
}
