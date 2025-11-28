
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

export interface User {
  id: string
  fullName: string
  email: string
  phone: string
  age: number
  gender: string
  fullAddress: string
  province: string
  street: string
  zip: number
  city: string
  country: string
  role: string
  status: string
  dateJoined: Date
  createdAt: Date
  updatedAt: Date
}

export interface Bookings {
  id: string
  ownerId: User
  customerId: User
  carId: Car
  pickupDate: Date
  returnDate: Date
  totalPrice: number
  paymentProof: string
  status: string
  idPhoto: string
}

