
export interface Owner {
  _id: string
  fullName: string
  age: number
  gender: string
  email: string
  role: string
}

export interface Car {
  _id: string
  ownerId: Owner
  name: string
  price: number
  carDetails: {
    seats: number
    transmission: string
    fuelType: string
    plateNumber: string
  }
  rating: number
  image: string
  status: string
}