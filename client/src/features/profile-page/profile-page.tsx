import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockUsers } from "@/lib/mock-data"
import { MapPin, Edit2, Save, X, ArrowLeft } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"


const ProfilePage = () => {
    const currentUser = mockUsers[0]
    const navigate = useNavigate()

    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        fullName: currentUser.fullName,
        email: currentUser.email,
        phone: currentUser.phone,
        age: currentUser.age,
        gender: currentUser.gender,
        fullAddress: `${currentUser.city}, ${currentUser.province}, ${currentUser.country}`,
        city: currentUser.city,
        province: currentUser.province,
        country: currentUser.country,
        zip: "10001",
        street: "Main St",
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSave = () => {
        setIsEditing(false)
    }

    const handleCancel = () => {
        setFormData({
            fullName: currentUser.fullName,
            email: currentUser.email,
            phone: currentUser.phone,
            age: currentUser.age,
            gender: currentUser.gender,
            fullAddress: `${currentUser.city}, ${currentUser.province}, ${currentUser.country}`,
            city: currentUser.city,
            province: currentUser.province,
            country: currentUser.country,
            zip: "10001",
            street: "Main St",
        })
        setIsEditing(false)
    }

    return(
        <div className = "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className = "max-w-4xl mx-auto">
                {/* Header */}
                <div className = "mb-8">
                    <Button
                        variant = "ghost"
                        onClick = {() => navigate("/")}
                        className = "mb-4 gap-2"
                    >
                        <ArrowLeft className = "size-4" />
                        Back
                    </Button>
                    <h1 className = "text-4xl font-bold text-gray-900">My Profile</h1>
                    <p className = "text-gray-600 mt-2">Manage your account information and preferences</p>
                </div>

                {/* Profile overview card */}
                <Card className = "mb-6 shadow-lg border-0">
                    <CardHeader className = "bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg p-3">
                        <div className = "flex items-start justify-between">
                            <div>
                                <CardTitle className = "text-2xl">{currentUser.fullName}</CardTitle>
                                <CardDescription className = "text-blue-100 mt-2">{currentUser.role}</CardDescription>
                            </div>
                            <div className = "flex gap-2">
                                {currentUser.status === "Verified" ? (
                                    <Badge className = "bg-green-500 hover:bg-green-600">Verified</Badge>
                                ) : (
                                    <Badge variant = "outline" className = "border-yellow-300 bg-yellow-50 text-yellow-700">Unverified</Badge>
                                )}
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                {/* Main content */}
                <Card className = "shadow-lg border-0 p-4">
                    <CardHeader className = "flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Your personal and address details</CardDescription>
                        </div>
                        {!isEditing && (
                            <Button
                                variant = "outline"
                                onClick = {() => setIsEditing(true)}
                                size = "sm"
                                className = "gap-2"
                            >
                                <Edit2 className = "size-4" />
                                Edit
                            </Button>
                        )}
                    </CardHeader>
                    <CardContent>
                        {isEditing ? (
                            <div className = "space-y-6">
                                <div>
                                    <h3 className = "text-lg font-semibold mb-4">Personal Information</h3>
                                    <div className = "grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label className = "block text-sm font-medium text-gray-700 mb-1">Full Name</Label>
                                            <Input 
                                                type = "text" 
                                                name = "fullName" 
                                                value = {formData.fullName}
                                                onChange = {handleInputChange}
                                                className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <Label className = "block text-sm font-medium text-gray-700 mb-1">Age</Label>
                                            <Input 
                                                type = "number"
                                                name = "age" 
                                                value = {formData.age}
                                                onChange = {handleInputChange}
                                                className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div> 
                                            <Label className = "block text-sm font-medium text-gray-700 mb-1">Gender</Label>
                                            <select 
                                            name="gender"
                                            value = {formData.gender}
                                            onChange = {handleInputChange}
                                            className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>

                                        <div>
                                            <Label className = "block text-sm font-medium text-gray-700 mb-1">Email</Label>
                                            <Input 
                                                type = "email"
                                                name = "email"
                                                value = {formData.email}
                                                onChange = {handleInputChange}
                                                className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div className = "md:col-span-2">
                                            <Label className = "block text-sm font-medium text-gray-700 mb-1">Phone</Label>
                                            <Input 
                                                type = "tel"
                                                name = "phone"
                                                value = {formData.phone}
                                                onChange = {handleInputChange}
                                                className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className = "text-lg font-semibold mb-4">Address Information</h3>
                                    <div className = "grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label className = "block text-sm font-medium text-gray-700 mb-1">Street</Label>
                                            <Input 
                                                type = "text"
                                                name = "street"
                                                value = {formData.street}
                                                onChange = {handleInputChange}
                                                className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <Label className = "block text-sm font-medium text-gray-700 mb-1">City</Label>
                                            <Input 
                                                type = "text"
                                                name = "city"
                                                value = {formData.city}
                                                onChange = {handleInputChange}
                                                className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <Label className = "block text-sm font-medium text-gray-700 mb-1">Province</Label>
                                            <Input 
                                                type = "text"
                                                name = "province"
                                                value = {formData.province}
                                                onChange = {handleInputChange}
                                                className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <Label className = "block text-sm font-medium text-gray-700 mb-1">Postal Code</Label>
                                            <Input 
                                                type = "text"
                                                name = "zip"
                                                value = {formData.zip}
                                                onChange = {handleInputChange}
                                                className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <Label className = "block text-sm font-medium text-gray-700 mb-1">Country</Label>
                                            <Input 
                                                type = "text"
                                                name = "country"
                                                value = {formData.country}
                                                onChange = {handleInputChange}
                                                className = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className = "flex gap-3 justify-end mt-6">
                                    <Button 
                                    variant = "outline" 
                                    onClick = {handleCancel}
                                    className = "gap-2 bg-transparent"
                                    >
                                        <X className = "size-4" />
                                        Cancel
                                    </Button>

                                    <Button
                                        onClick= {handleSave}
                                        className = "gap-2"
                                    >
                                        <Save className = "size-4" />
                                        Save Changes
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className = "space-y-6">
                                <div>
                                    <h3 className = "text-lg font-semibold mb-4">Personal Information</h3>
                                    <div className = "grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className = "flex items-start gap-3">
                                            <div>
                                                <p className = "text-sm text-gray-600">Email Address</p>
                                                <p className = "font-medium text-gray-900">{currentUser.email}</p>
                                            </div>
                                        </div>

                                        <div className = "flex items-start gap-3">
                                            <div>
                                                <p className = "text-sm text-gray-600">Phone Number</p>
                                                <p className = "font-medium text-gray-900">{currentUser.phone}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className = "text-sm text-gray-600 mb-1">Age</p>
                                            <p className = "font-medium text-gray-900">{currentUser.age} years old</p>
                                        </div>

                                        <div>
                                            <p className = "text-sm text-gray-600 mb-1">Gender</p>
                                            <p className = "font-medium text-gray-900">{currentUser.gender}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className = "text-lg font-semibold mb-4">Address Information</h3>
                                    <div className = "flex items-start gap-3">
                                        <MapPin className = "size-5 text-blue-500 mt-0.5 shrink-0" />
                                        <div>
                                            <p className = "text-sm text-gray-600">Full Address</p>
                                            <p className = "font-medium text-gray-900">{currentUser.city}, {currentUser.province}</p>
                                            <p className = "text-gray-700">{currentUser.country}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Acc Info Footer */}
                <Card className = "mt-6 shadow-lg border-0 bg-gray-50 p-4">
                    <CardContent className = "pt-6">
                        <div className = "grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div>
                                    <p className = "text-gray-600">Account Role</p>
                                    <p className = "font-semibold text-gray-900">{currentUser.role}</p>
                                </div>

                                <div>
                                    <p className = "text-gray-600">Member Since</p>
                                    <p className = "font-semibold text-gray-900">{currentUser.dateJoined.toString()}</p>
                                </div>

                                <div>
                                    <p className = "text-gray-600">Verification Status</p>
                                    <Badge className = {currentUser.status === "Verified" ? "bg-green-500" : "bg-yellow-500"}>
                                        {currentUser.status}
                                    </Badge>
                                </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default ProfilePage