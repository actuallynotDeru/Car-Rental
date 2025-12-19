export interface User {
  _id: string;
  fullName: string;
  age: number;
  gender: string;
  email: string;
  fullAddress: string;
  province: string;
  street: string;
  zip: number;
  city: string;
  country: string;
  phone: string;
  dateJoined: string;
  role: string;
  status: string;
  selfiePhoto: string | null;
}

export interface Car {
  _id: string;
  name: string;
  price: number;
  carDetails: {
    seats: number;
    transmission: string;
    fuelType: string;
    plateNumber: string;
  };
  rating: number;
  image: string;
  status: string;
}

export interface Booking {
  _id: string;
  ownerId: string | User;
  customerId: string | User;
  carId: string | Car;
  pickupDate: string;
  returnDate: string;
  totalPrice: number;
  paymentProof: string;
  status: "Pending" | "Confirmed" | "Cancelled" | "Completed";
  idPhoto: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BookingWithDetails extends Omit<Booking, 'carId' | 'customerId'> {
  carId: Car;
  customerId: User;
}
