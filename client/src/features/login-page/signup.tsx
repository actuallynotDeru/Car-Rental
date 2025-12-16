import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  MapPin, 
  Building, 
  Globe, 
  Eye, 
  EyeOff, 
  Loader2 
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AuthAPI } from "./api/auth.api"

export function SignupForm() {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string>("")

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    street: "",
    city: "",
    province: "",
    country: "",
    fullAddress: "",
  })

  useEffect(() => {
    const { street, city, province, country } = formData
    const addressParts = [street, city, province, country].filter(Boolean)
    setFormData(prev => ({ ...prev, fullAddress: addressParts.join(", ") }))
  }, [formData.street, formData.city, formData.province, formData.country])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await AuthAPI.register(formData)
      navigate("/login")
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center bg-gray-50/50">
      <Card className="w-full max-w-2xl shadow-lg">
        
        <CardHeader className="text-center space-y-1 pb-2 py-4">
          <CardTitle className="text-2xl font-bold tracking-tight">Create an account</CardTitle>
          <CardDescription>Enter your details below to create your account</CardDescription>
        </CardHeader>

        <CardContent className="pb-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {error && (
              <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md flex items-center justify-center font-medium animate-in fade-in slide-in-from-top-1">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {/* SECTION: Account Details */}
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Account Details</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {/* Compacted Input Groups: space-y-1 instead of space-y-2 */}
                  <div className="space-y-1 md:col-span-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="fullName" className="pl-9" placeholder="John Doe" value={formData.fullName} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="email" type="email" className="pl-9" placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="phone" className="pl-9" placeholder="+1 234 567 890" value={formData.phone} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"} 
                        className="pl-9 pr-10" 
                        placeholder="••••••••" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* SECTION: Address Details */}
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Location</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-1 md:col-span-2">
                    <Label htmlFor="street">Street Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="street" className="pl-9" placeholder="123 Main St" value={formData.street} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="city">City</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="city" className="pl-9" placeholder="New York" value={formData.city} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="province">Province / State</Label>
                    <Input id="province" placeholder="NY" value={formData.province} onChange={handleChange} required />
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <Label htmlFor="country">Country</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="country" className="pl-9" placeholder="USA" value={formData.country} onChange={handleChange} required />
                    </div>
                  </div>
                  
                  <input type="hidden" id="fullAddress" value={formData.fullAddress} />
                </div>
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full mt-4">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </CardContent>
        
        {/* Compacted Footer padding */}
        <CardFooter className="justify-center border-t p-4">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Button variant="link" className="p-0 h-auto font-semibold" onClick={() => navigate("/login")}>
              Sign in
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}