import Build from './build'
import Category from './category'
import OperationalSystems from './operational-systems'
import Price from './price'
import Screen from './screen'

export default interface Game {
  id: string
  userId: number
  title: string
  shortDescription: string
  description: string
  actor: string
  avatarUrl: string
  headerUrl: string
  uurest: string
  createAt: string
  updateAt: string
  categories: Category[]
  systems: OperationalSystems[]
  screens: Screen[]
  prices: Price[]
  builds: Build[]
}
