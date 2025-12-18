
export interface Owner {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  fullAddress: string;
  province: string;
  street: string;
  zip: number;
  city: string;
  country: string;
  role: string;
  status: string;
  dateJoined: Date;
  createdAt: Date;
  updatedAt: Date;
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
  status: "Available" | "Unavailable"
  createdAt: Date
  updatedAt: Date
}

export interface Bookings {
  _id: string
  carId: Car["_id"]
  pickupDate: Date
  returnDate: Date
  status: string
}