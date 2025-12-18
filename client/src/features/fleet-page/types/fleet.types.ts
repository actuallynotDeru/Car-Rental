
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
  ownerId: Owner | string
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

export interface CarFormData {
  name: string
  price: string
  seats: string
  transmission: string
  fuelType: string
  plateNumber: string
  image: File | null
  imagePreview: string
  status: string
}

export interface CreateCarRequest {
  ownerId: string
  name: string
  price: number
  carDetails: {
    seats: number
    transmission: string
    fuelType: string
    plateNumber: string
  }
  rating?: number
  image: File
  status: string
}

export interface UpdateCarRequest {
  name?: string
  price?: number
  carDetails?: {
    seats: number
    transmission: string
    fuelType: string
    plateNumber: string
  }
  image?: File
  status?: string
}