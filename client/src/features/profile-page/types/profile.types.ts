
export interface UserProfile {
  _id: string
  age: number
  fullName: string
  email: string
  phone: string
  role: string
  dateOfBirth: string
  fullAddress?: string
  province?: string
  city?: string;
  country?: string;
  zip?: string;
  createdAt: string;
  updatedAt: string;
  selfiePhoto: File
}