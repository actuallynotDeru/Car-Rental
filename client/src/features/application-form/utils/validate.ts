import type { ApplicationFormData } from "../types/application-form.types";

export const validateForm = (formData: ApplicationFormData) => {
  const newErrors: Record<string, string> = {};
  
  if(!formData.businessName.trim()) {
    newErrors.businessName = 'Business name is required'
  } else if(formData.businessName.length > 100) {
    newErrors.businessName = 'Must be less than 100 characters'
  }
  
  if(!formData.businessAddress.trim()) {
    newErrors.businessAddress = 'Business Address is required'
  } else if(formData.businessAddress.length > 100) {
    newErrors.businessAddress = 'Must be less than 100 characters'
  }
  
  if(!formData.businessPhone.trim()) {
    newErrors.businessPhone = 'Business Phone is required';
  } else if(!/^\+?[\d\s\-()]+$/.test(formData.businessPhone)) {
    newErrors.businessPhone = 'Invalid phone number';
  }
  
  if(!formData.businessEmail.trim()) {
    newErrors.businessEmail = 'Business Email is required';
  } else if(formData.businessEmail.length > 50) {
    newErrors.businessEmail = 'Must be less than 50 characters'
  }
  
  if(!formData.taxId.trim()) {
    newErrors.taxId = 'Tax ID is required';
  } else if(formData.taxId.length > 20) {
    newErrors.taxId = 'Must be less than 20 characters';
  }
  
  if(formData.description && formData.description.length > 500) {
    newErrors.description = 'Must be less than 500 characters';
  }
  
  if(!formData.drivingLicense) {
    newErrors.drivingLicense = 'Driving License is required'
  }
  
  if(!formData.businessLicense) {
    newErrors.businessLicense = 'Business License is required';
  }
  
  return newErrors;
}