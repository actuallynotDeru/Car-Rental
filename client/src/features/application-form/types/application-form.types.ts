
export interface User {
  _id: string
  fullName: string
  email: string
  phoneNumber: string
}

export interface ApplicationFormData {
  userId: string
  businessName: string
  businessAddress: string
  businessPhone: string
  businessEmail: string
  taxId: string
  description?: string
  drivingLicense: File
  businessLicense: File
}