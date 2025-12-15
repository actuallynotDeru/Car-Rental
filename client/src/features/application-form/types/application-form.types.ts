// client/src/features/application-form/types/application.types.ts

export interface ApplicationFormData {
  businessName: string
  businessAddress: string
  businessPhone: string
  businessEmail: string
  taxId: string
  description: string
  drivingLicense: File | null
  businessLicense: File | null
}

export interface ApplicationRequest {
  userId: string
  businessName: string
  businessAddress: string
  businessPhone: string
  businessEmail: string
  taxId: string
  description: string
  drivingLicense: File
  businessLicense: File
}

export interface Application {
  _id: string
  userId: string
  businessName: string
  businessAddress: string
  businessPhone: string
  businessEmail: string
  taxId: string
  drivingLicense: string
  businessLicense: string
  description: string
  status: "Pending" | "Approved" | "Rejected"
  adminNotes?: string
  reviewedBy?: string
  reviewedAt?: Date
  createdAt: Date
  updatedAt: Date
}
