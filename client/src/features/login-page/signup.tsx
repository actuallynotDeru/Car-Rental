import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field"

import { AuthAPI } from "./api/auth.api"

export function SignupForm() {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Fill in your details to continue</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>

            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                {error}
              </div>
            )}

            <Field>
              <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
              <Input id="fullName" value={formData.fullName} onChange={handleChange} required />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" value={formData.email} onChange={handleChange} required />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" value={formData.password} onChange={handleChange} required />
            </Field>

            <Field>
              <FieldLabel htmlFor="phone">Phone</FieldLabel>
              <Input id="phone" value={formData.phone} onChange={handleChange} required />
            </Field>

            <Field>
              <FieldLabel htmlFor="street">Street</FieldLabel>
              <Input id="street" value={formData.street} onChange={handleChange} required />
            </Field>

            <Field>
              <FieldLabel htmlFor="city">City</FieldLabel>
              <Input id="city" value={formData.city} onChange={handleChange} required />
            </Field>

            <Field>
              <FieldLabel htmlFor="province">Province</FieldLabel>
              <Input id="province" value={formData.province} onChange={handleChange} required />
            </Field>

            <Field>
              <FieldLabel htmlFor="country">Country</FieldLabel>
              <Input id="country" value={formData.country} onChange={handleChange} required />
            </Field>

            <Field>
              <FieldLabel htmlFor="fullAddress">Full Address</FieldLabel>
              <Input
                id="fullAddress"
                value={formData.fullAddress}
                onChange={handleChange}
                required
              />
            </Field>

            <Field>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
              <FieldDescription className="text-center">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="cursor-pointer underline"
                >
                  Sign in
                </span>
              </FieldDescription>
            </Field>

          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
