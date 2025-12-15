import { API_BASE_URL } from "@/config/apiURL"
import axios from "axios"
import type { ApplicationRequest, Application } from "../types/application-form.types"

const APPLICATION_API = `${API_BASE_URL}/car-owner-applications`

export const ApplicationAPI = {
  // Create new application
  createApplication: async (data: ApplicationRequest): Promise<Application> => {
    const formData = new FormData()
    
    formData.append("userId", data.userId)
    formData.append("businessName", data.businessName)
    formData.append("businessAddress", data.businessAddress)
    formData.append("businessPhone", data.businessPhone)
    formData.append("businessEmail", data.businessEmail)
    formData.append("taxId", data.taxId)
    formData.append("description", data.description)
    formData.append("drivingLicense", data.drivingLicense)
    formData.append("businessLicense", data.businessLicense)
    
    const res = await axios.post(APPLICATION_API, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    
    return res.data
  },

  // Get application by ID
  getApplicationById: async (id: string): Promise<Application> => {
    const res = await axios.get(`${APPLICATION_API}/${id}`)
    return res.data
  },

  // Get applications by user ID
  getApplicationsByUser: async (userId: string): Promise<Application[]> => {
    const res = await axios.get(`${APPLICATION_API}/user/${userId}`)
    return res.data
  },

  // Get all applications
  getAllApplications: async (): Promise<Application[]> => {
    const res = await axios.get(APPLICATION_API)
    return res.data
  },
}
