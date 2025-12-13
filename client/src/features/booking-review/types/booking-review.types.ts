
export interface User {
  id?: string;
  _id?: string;
  fullName: string;
  email: string;
  phone: string;
  age?: number;
  gender?: string;
  fullAddress?: string;
  province?: string;
  street?: string;
  zip?: number;
  city?: string;
  country?: string;
  role: string;
  status: string;
}

export interface Car {
  id?: string;
  _id?: string;
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
  id?: string;
  _id?: string;
  ownerId: string | User;
  customerId: string | User;
  carId: string | Car;
  pickupDate: Date | string;
  returnDate: Date | string;
  totalPrice: number;
  paymentProof?: string;
  idPhoto?: string;
  status: "Pending" | "Confirmed" | "Cancelled" | "Completed";
  createdAt?: Date | string;
  updatedAt?: Date | string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  carName?: string;
  carPlate?: string;
}