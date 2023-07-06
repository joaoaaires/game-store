import { GamesFilter } from '@/components/GamesFilter'
import { GamesList } from '@/components/GamesList'
import { FilterGamesContextProvider } from '@/contexts/filterGames'

export default function Home() {
  return (
    <div className="flex h-full flex-col md:flex-row ">
      <FilterGamesContextProvider>
        <div className="basis-1/2 bg-black-400 text-black-900 sm:basis-1/4 lg:basis-1/6">
          <GamesFilter />
        </div>
        <div className="flex-1 bg-white">
          <GamesList />
        </div>
      </FilterGamesContextProvider>
    </div>
  )
}
