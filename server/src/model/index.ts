export interface UserSignUp {
  name: string
  email: string
  password: string
}

export interface UserSignIn {
  email: string
  password: string
}

export interface Category {
  id: number
  description?: string | null
}

export interface OperationalSystems {
  id: number
  description?: string | null
}

export interface Screenshots {
  screenUrl: string
}

export interface Build {
  buildNumber: number
  description: string
}

export interface Price {
  price: number
}

export interface Game {
  title: string
  shortDescription: string
  description: string
  actor: string
  avatarUrl: string
  headerUrl: string
  uurest: string
  categories: Category[]
  systems: OperationalSystems[]
  screens: Screenshots[]
  builds: Build[]
  prices: Price[]
}
