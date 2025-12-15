import { API_BASE_URL } from "@/config/apiURL";
import axios from "axios";
import type { ApplicationFormData } from "../types/application-form.types";

export const submitCarOwnerApplication = async(formData: ApplicationFormData) => {
  try {
    const data = new FormData();
    
    data.append('userId', formData.userId);
    data.append('businessName', formData.businessName);
    data.append('businessAddress', formData.businessAddress);
    data.append('businessPhone', formData.businessPhone);
    data.append('businessEmail', formData.businessEmail);
    data.append('taxId', formData.taxId);
    
    if(formData.description) {
      data.append('description', formData.description);
    }
    
    data.append('drivingLicense', formData.drivingLicense);
    data.append('businessLicense', formData.businessLicense);
    
    const res = await axios.post(`${API_BASE_URL}/car-owner-applications`, data);
    return res.data;
    
  } catch(err: any) {
    if(err.response) {
      throw new Error(err.response.data.message || "Failed to submit application");
    }
    throw new Error("Network error. Please try again.");
  }
}