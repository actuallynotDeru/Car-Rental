import { API_BASE_URL } from "@/config/apiURL"
import axios from "axios"
import type { LoginRequest, RegisterRequest, AuthResponse, User } from "../types/auth.types"

const AUTH_API = `${API_BASE_URL}/auth`

export const AuthAPI = {
  // Register new user
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const formData = new FormData()
    
    // Append all fields to FormData
    formData.append("fullName", data.fullName)
    formData.append("email", data.email)
    formData.append("password", data.password)
    
    if (data.age) formData.append("age", data.age.toString())
    if (data.gender) formData.append("gender", data.gender)
    if (data.phone) formData.append("phone", data.phone)
    if (data.fullAddress) formData.append("fullAddress", data.fullAddress)
    if (data.province) formData.append("province", data.province)
    if (data.street) formData.append("street", data.street)
    if (data.zip) formData.append("zip", data.zip.toString())
    if (data.city) formData.append("city", data.city)
    if (data.country) formData.append("country", data.country)
    if (data.selfiePhoto) formData.append("selfiePhoto", data.selfiePhoto)
    
    const res = await axios.post(`${AUTH_API}/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    
    // Store token in localStorage
    if (res.data.token) {
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data.user))
    }
    
    return res.data
  },

  // Login user
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const res = await axios.post(`${AUTH_API}/login`, data)
    
    // Store token in localStorage
    if (res.data.token) {
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data.user))
    }
    
    return res.data
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const token = localStorage.getItem("token")
    const res = await axios.get(`${AUTH_API}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
  },

  // Logout user
  logout: async (): Promise<void> => {
    const token = localStorage.getItem("token")
    await axios.post(`${AUTH_API}/logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    
    // Clear localStorage
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  },
}
