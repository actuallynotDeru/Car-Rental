
export interface User {
  _id: string
  fullName: string
  email: string
  role: string
  status: string
  selfiePhoto?: string
  age?: number
  gender?: string
  phone?: string
  fullAddress?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  fullName: string
  email: string
  password: string
  age?: number
  gender?: string
  phone?: string
  fullAddress?: string
  province?: string
  street?: string
  zip?: number
  city?: string
  country?: string
  selfiePhoto?: File
}

export interface AuthResponse {
  message: string
  token: string
  user: User
}

export interface LoginFormData {
  email: string
  password: string
}

export interface SignupFormData {
  fullName: string
  email: string
  password: string
  confirmPassword: string
}