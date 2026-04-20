export interface City {
  name: string
  slug: string
  coordinates: [number, number]
  photoCount: number
}

export interface Location {
  region: string
  country: string
  slug: string
  coordinates: [number, number]
  cities: City[]
}

export interface Photo {
  id: string
  title: string
  city: string
  region: string
  country: string
  date: string
  tags: string[]
  story: string
  image: string
  featured: boolean
}
