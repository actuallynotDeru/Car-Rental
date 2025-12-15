import React, { useState } from "react";
import { Upload, X, CheckCircle, Briefcase, MapPin, Car, AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { submitCarOwnerApplication } from "./api/application-form.api";
import { useParams } from "react-router-dom";


interface FormData {
    businessName: string;
    businessAddress: string;
    businessPhone: string;
    businessEmail: string;
    taxId: string;
    description: string;
    drivingLicense: File | null;
    businessLicense: File | null;
    [key: string]: string | File | null;
}

const ApplicationForm = () => {
    const [formData, setFormData] = useState<FormData>({
        businessName: '',
        businessAddress: '',
        businessPhone: '',
        businessEmail: '',
        taxId: '',
        description: '',
        drivingLicense: null,
        businessLicense: null,
    });
    const [errors, setErrors] = useState<Record<string, string>>({
        businessName: '',
        businessAddress: '',
        businessPhone: '',
        businessEmail: '',
        taxId: '',
        description: '',
        drivingLicense: '',
        businessLicense: '',
    });
    const [submitted, setSubmitted] = useState(false); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null)
    
    const { userId } = useParams<{ userId: string }>();
    
    if(!userId) {
      return (
        <div className = "min-h-screen flex items-center justify-center">
          <p className = "text-red-600">Invalid User</p>
        </div>
      )
    }
    
    const currentUserId = userId;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
      setSubmitError(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({
                    ...prev,
                    [fieldName]: 'File size must be less than 5MB'
                }));
                return;
            }

            if (!file.type.startsWith('image/')) {
                setErrors(prev => ({
                    ...prev,
                    [fieldName]: 'Only image files are allowed'
                }));
                return;
            }

            setFormData(prev => ({
                ...prev,
                [fieldName]: file
            }));
            setErrors(prev => ({
                ...prev,
                [fieldName]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if(!formData.businessName.trim()) {
            newErrors.businessName = 'Business name is required';
        } else if(formData.businessName.length > 100) {
            newErrors.businessName = 'Must be less than 100 characters';
        }

        if(!formData.businessAddress.trim()) {
            newErrors.businessAddress = 'Business Address is required';
        } else if(formData.businessAddress.length > 100) {
            newErrors.businessAddress = 'Must be less than 100 characters';
        }

        if(!formData.businessPhone.trim()) {
            newErrors.businessPhone = 'Business phone is required';
        } else if(!/^\+?[\d\s\-()]+$/.test(formData.businessPhone)) {
            newErrors.businessPhone = 'Invalid phone number';
        }

        if (!formData.businessEmail.trim()) {
        newErrors.businessEmail = 'Business email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail)) {
        newErrors.businessEmail = 'Invalid email';
        } else if (formData.businessEmail.length > 50) {
        newErrors.businessEmail = 'Must be less than 50 characters';
        }

        if (!formData.taxId.trim()) {
        newErrors.taxId = 'Tax ID is required';
        } else if (formData.taxId.length > 20) {
        newErrors.taxId = 'Must be less than 20 characters';
        }

        if (formData.description && formData.description.length > 500) {
        newErrors.description = 'Must be less than 500 characters';
        }

        if (!formData.drivingLicense) {
        newErrors.drivingLicense = 'Driving license is required';
        }

        if (!formData.businessLicense) {
        newErrors.businessLicense = 'Business license is required';
        }

        return newErrors;
    }

    const handleSubmit = async() => {
      const newErrors = validateForm();
      
      if(Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      
      setIsSubmitting(true);
      setSubmitError(null);
      
      try {
        await submitCarOwnerApplication({
          userId: currentUserId,
          businessName: formData.businessName,
          businessAddress: formData.businessAddress,
          businessPhone: formData.businessPhone,
          businessEmail: formData.businessEmail,
          taxId: formData.taxId,
          description: formData.description || undefined,
          drivingLicense: formData.drivingLicense!,
          businessLicense: formData.businessLicense!
        });
       
        setSubmitted(true);
       
       setTimeout(() => {
         setSubmitted(false);
         setFormData({
           businessName: '',
           businessAddress: '',
           businessPhone: '',
           businessEmail: '',
           taxId: '',
           description: '',
           drivingLicense: null,
           businessLicense: null,
         });
       }, 3000) 
      } catch(err: any) {
        setSubmitError(err.message);
      } finally {
        setIsSubmitting(false);
      }
    }

    const removeFile = (fieldName: string) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: null,
        }));
    };

    if(submitted) {
        return(
            <div className = "min-h-screen bg-white flex items-center justify-center p-8">
                <div className = "text-center max-w-md">
                    <div className = "flex justify-center mb-6">
                        <CheckCircle className = "size-20 text-green-500" />
                    </div>
                    <h2 className = "text-3xl font-bold text-gray-900 mb-3">Application Submitted!</h2>
                    <p className = "text-gray-600 text-lg">Your car owner application has been successfully submitted.</p>
                </div>
            </div>
        )
    }

    return(
            <div className = "min-h-screen bg-white">
                {/* Hero */}
                <div className = "w-full h-48 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
                    <div className = "absolute inset-0 opacity-30">
                        <div className = "absolute top-10 right-1/4 w-1 h-32 bg-orange-500 rotate-45 blur-sm"></div>
                        <div className = "absolute top-20 right-1/3 w-px hl-20 bg-blue-400 rotate-12"></div>
                    </div>
                </div>
    
                {/* Logo */}
                <div className="max-w-7xl mx-auto px-8 -mt-16 relative z-10">
                    <div className="w-24 h-24 bg-black rounded-2xl flex items-center justify-center shadow-lg">
                        <Car className="w-12 h-12 text-white" />
                    </div>
                </div>
    
                <div className = "max-w-7xl mx-auto p-8">
                    {submitError && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                            <div>
                                <p className="text-red-800 font-medium">Submission Failed</p>
                                <p className="text-red-700 text-sm">{submitError}</p>
                            </div>
                        </div>
                    )}
    
                    <div className = "grid grid-cols-1 lg:grid-cols-2 gap-12">
                        
                        {/* Left Column - Information */}
                        <div className = "space-y-8">
                            <div>
                                <h1 className = "text-4xl font-bold text-gray-900 mb-4">Become a Car Owner</h1>
                                <div className = "flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                                    <div className = "flex items-center gap-1">
                                        <Briefcase className = "size-4"/>
                                        <span>Business Opportunity</span>
                                    </div>
                                    
                                    <div className = "flex items-center gap-1">
                                        <MapPin className = "size-4"/>
                                        <span>Flexible Location</span>
                                    </div>
    
                                    <div className = "flex items-center gap-1">
                                        <Briefcase className = "size-4"/>
                                        <span>Vehicle Listing</span>
                                    </div>
                                </div>
                            </div>
    
                            <div>
                                <p className = "text-gray-700 leading-relaxed">
                                    Our mission is to create a comprehensive car rental platform that empowers vehicle owners to maximize their earning potential while providing customers with convenient, reliable transportation options.                            
                                </p>
    
                                <p className="text-gray-700 leading-relaxed mt-4">
                                    As the car rental industry evolves, traditional rental agencies face high overhead costs and limited inventory flexibility. Today, car owners need a platform that enables them to list their vehicles, manage bookings seamlessly, and reach customers directly. Which requires efficient systems, secure payment processing, and trust-building features. That's where we come in. We are building a modern platform from the ground up, offering comprehensive tools that handle everything - from vehicle listings and booking management to payment processing and customer verification - all in one centralized system.
                                </p>
                            </div>
                            
                            <div>
                                <h2 className = "text-2xl font-bold text-gray-900 mb-4">Benefits of becoming a car owner</h2>
                                <ul className = "space-y-3 text-gray-700">
                                    <li className = "flex gap-3">
                                        <span className="text-blue-600 font-bold">•</span>
                                        <span>
                                            At AutoRent, we are focused on creating the best experience for both car owners and renters. We prioritize ease of use, security, and reliability in every feature we build.
                                        </span>
                                    </li>
                                    
                                    <li className = "flex gap-3">
                                        <span className="text-blue-600 font-bold">•</span>
                                        <span>
                                            We focus on building an absolutely seamless user experience. We provide comprehensive dashboard tools, automated booking management, and secure payment processing.
                                        </span>
                                    </li>
    
                                    <li className = "flex gap-3">
                                        <span className="text-blue-600 font-bold">•</span>
                                        <span>
                                            We believe in transparency, trust, and empowering vehicle owners to build sustainable rental businesses. Join our growing community of successful car owners today!
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
    
                        {/* Right column - Application Form */}
                        <div>
                            <div className = "bg-white border border-gray-200 rounded-xl p-8 sticky top-8">
                                <h2 className = "text-2xl font-bold text-gray-900 mb-6">Application</h2>
    
                                <div className = "space-y-5">
                                    <div className = "grid grid-cols-2 gap-4">
                                        <div>
                                            <Label className = "block text-sm text-gray-700 mb-2">
                                                Business name <span className = "text-red-500">*</span>
                                            </Label>
                                            <Input 
                                                type = "text"
                                                name = "businessName"
                                                value = {formData.businessName}
                                                onChange = {handleInputChange}
                                                placeholder = "Business Name"
                                            />
                                            {errors.businessName && (
                                                <p className = "text-red-500 text-xs mt-1">{errors.businessName}</p>
                                            )}
                                        </div>
    
                                       <div>
                                            <Label className = "block text-sm text-gray-700 mb-2">
                                                Tax ID <span className = "text-red-500">*</span>
                                            </Label>
                                            <Input 
                                                type = "text"
                                                name = "taxId"
                                                value = {formData.taxId}
                                                onChange = {handleInputChange}
                                                placeholder = "Tax ID"
                                            />
                                            {errors.taxId && (
                                                <p className = "text-red-500 text-xs mt-1">{errors.taxId}</p>
                                            )}
                                        </div>
                                    </div>
    
                                    <div className = "grid grid-cols-2 gap-4">
                                       <div>
                                            <Label className = "block text-sm text-gray-700 mb-2">
                                                Business Email <span className = "text-red-500">*</span>
                                            </Label>
                                            <Input 
                                                type = "email"
                                                name = "businessEmail"
                                                value = {formData.businessEmail}
                                                onChange = {handleInputChange}
                                                placeholder = "Business Email"
                                            />
                                            {errors.businessEmail && (
                                                <p className = "text-red-500 text-xs mt-1">{errors.businessEmail}</p>
                                            )}
                                        </div>
    
                                        <div>
                                            <Label className = "block text-sm text-gray-700 mb-2">
                                                Business Phone <span className = "text-red-500">*</span>
                                            </Label>
                                            <Input 
                                                type = "tel"
                                                name = "businessPhone"
                                                value = {formData.businessPhone}
                                                onChange = {handleInputChange}
                                                placeholder = "Business Phone"
                                            />
                                            {errors.businessPhone && (
                                                <p className = "text-red-500 text-xs mt-1">{errors.businessPhone}</p>
                                            )}
                                        </div>
                                    </div>
    
                                    <div>
                                        <Label className = "block text-sm text-gray-700 mb-2">
                                            Business Address <span className = "text-red-500">*</span>
                                        </Label>
                                        <Input 
                                            type = "text"
                                            name = "businessAddress"
                                            value = {formData.businessAddress}
                                            onChange = {handleInputChange}
                                            placeholder = "Business Address"
                                        />
                                        {errors.businessAddress && (
                                            <p className = "text-red-500 text-xs mt-1">{errors.businessAddress}</p>
                                        )}
                                    </div>
    
                                    <div>
                                        <Label className = "block text-sm text-gray-700 mb-2">
                                            What would you like us to know about your business?
                                        </Label>
                                        <Textarea 
                                            name = "description"
                                            value = {formData.description}
                                            onChange = {handleInputChange}
                                            placeholder = "Tell us about your business..."
                                            rows = {4}
                                        />
                                        <div className = "flex justify-between items-center mt-1">
                                            {errors.description ? (
                                                <p className = "text-red-500 text-xs">{errors.description}</p>
                                            ) : (
                                                <span></span>
                                            )}
                                            <span className = "text-xs text-gray-500">{formData.description.length}/500</span>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <Label className = "block text-sm text-gray-700 mb-2">
                                            Drivers' License <span className = "text-red-500">*</span>
                                        </Label>
                                        {!formData.drivingLicense ? (
                                            <Label className = {`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition ${
                                                errors.drivingLicense ? 'border-red-500' : 'border-gray-300'
                                            }`}>
                                                <Upload className = "size-6 text-gray-400 mb-2"/>
                                                <p className = "text-sm text-blue-600">Drop your driver's license here or <span className = "underline">browse</span></p>
                                                <p className = "text-xs text-gray-400 mt-1">Maximum file size: 10MB (jpg, png, pdf, webp)</p>
                                                <Input 
                                                    type = "file"
                                                    accept = "image/*,application/pdf"
                                                    onChange = {(e) => handleFileChange(e, 'drivingLicense')}
                                                    className = "hidden"
                                                />
                                            </Label>
                                        ) : (
                                            <div className = "flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                                <div className = "flex items-center gap-2">
                                                    <CheckCircle className = "size-5 text-green-600"/>
                                                    <span className = "text-sm text-gray-700">{formData.drivingLicense.name}</span>
                                                </div>
    
                                                <Button
                                                    type = "button"
                                                    onClick = {() => removeFile('drivingLicense')}
                                                    variant = "outline"
                                                    size = "sm"
                                                >
                                                    <X className = "size-4" />
                                                </Button>
                                            </div>
                                        )}
                                        {errors.drivingLicense && (
                                            <p className = "text-red-500 text-xs mt-1">{errors.drivingLicense}</p>
                                        )}
                                    </div>
    
                                    <div>
                                        <Label className = "block text-sm text-gray-700 mb-2">
                                            Business License <span className = "text-red-500">*</span>
                                        </Label>
                                        {!formData.businessLicense ? (
                                            <Label className = {`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition ${
                                                errors.businessLicense ? 'border-red-500' : 'border-gray-300'
                                            }`}>
                                                <Upload className = "size-6 text-gray-400 mb-2" />
                                                <p className = "text-sm text-blue-600">Drop your business license here or <span className = "underline">browse</span></p>
                                                <p className = "text-xs text-gray-400">Maximum file size: 10MB (jpg, png, pdf, webp)</p>
                                                <Input 
                                                    type = "file"
                                                    accept = "image/*,application/pdf"
                                                    onChange = {(e) => handleFileChange(e, 'businessLicense')}
                                                    className = "hidden"
                                                />
                                            </Label>
                                        ) : (
                                            <div className = "flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                                <div className = "flex items-center gap-2">
                                                    <CheckCircle className = "size-5 text-green-600" />
                                                    <span className = "text-sm text-gray-700">{formData.businessLicense.name}</span>
                                                </div>
                                                <Button
                                                    type = "button"
                                                    onClick = {() => removeFile('businessLicense')}
                                                    variant = "outline"
                                                    size = "sm"
                                                >
                                                    <X className = "size-4"/>
                                                </Button>
                                            </div>
                                        )}
                                        {errors.businessLicense && (
                                            <p className = "text-red-500 text-xs mt-1">{errors.businessLicense}</p>
                                        )}
                                    </div>
    
                                    <Button
                                        type = "button"
                                        onClick = {handleSubmit}
                                        disabled = {isSubmitting}
                                        className = "w-full bg-black text-white hover:bg-gray-800"
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
export default ApplicationForm;
