
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

export interface Application {
  id: string
  userId: User
  businessName: string
  businessAddress: string
  businessPhone: string
  businessEmail: string
  taxId: string
  drivingLicense: File
  businessLicense: File
  description: string
  status: string
  adminNotes: string
  reviewedBy: User
  reviewedAt: Date
  createdAt: Date
  updatedAt: Date
}