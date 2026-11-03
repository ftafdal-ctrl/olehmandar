export type Packaging = "Standar Aman" | "Vakum Ekstra" | "Box Hampers"

export type Product = {
  id: string
  slug: string
  name: string
  category: string
  short: string
  description: string
  price: number
  compareAt?: number
  stock: number
  sold: number
  rating: number
  reviews: number
  origin: string
  image: string
  gallery: string[]
  shelfLife: number
  weight: number
  halal: string
  pirt: string
  ingredients: string
  story: string
  featured?: boolean
  hamper?: boolean
}

export type CartItem = {
  id: string
  productId?: string
  name: string
  image: string
  price: number
  quantity: number
  packaging: Packaging
  note?: string
  hamperItems?: string[]
}

export type Address = {
  name: string
  phone: string
  street: string
  city: string
  province: string
  postal: string
}

export type Order = {
  id: string
  createdAt: string
  items: CartItem[]
  address: Address
  shipping: string
  payment: string
  total: number
  status: string
}
