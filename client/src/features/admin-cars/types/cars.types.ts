

export interface Car {
  id: string
  ownerId: string
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