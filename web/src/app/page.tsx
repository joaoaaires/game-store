import { FilterSideBar } from '@/components/home/FilterSideBar'
import { Header } from '@/components/shared/Header'

export default function Home() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <FilterSideBar />
        <div className="flex-auto bg-yellow-400">RIGHT</div>
      </div>
    </div>
  )
}
