"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { mockCars, mockUsers, mockBookings } from "@/lib/mock-data"
import { Car, Plus, Search, Edit2, Trash2, Fuel, Users, Settings2, Star, TrendingUp, Calendar, ArrowLeft } from "lucide-react"
import StatCard from "./components/stat-cards"
import EditModal from "./components/edit-modal"

export default function FleetPage() {
  // Mock current car owner (Sarah Johnson - ownerId: "2")
  const currentOwner = mockUsers.find((u) => u.id === "2")!
  const navigate = useNavigate()

  // Get only cars owned by the current user
  const [ownerCars, setOwnerCars] = useState(mockCars.filter((car) => car.ownerId === currentOwner.id))

  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [editingCar, setEditingCar] = useState<(typeof mockCars)[0] | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [addDialogOpen, setAddDialogOpen] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    seats: "",
    transmission: "Automatic",
    fuelType: "Gasoline",
    plateNumber: "",
    image: "",
    status: "Available",
  })

  // Calculate stats
  const totalCars = ownerCars.length
  const availableCars = ownerCars.filter((c) => c.status === "Available").length
  const totalBookings = mockBookings.filter((b) => b.ownerId === currentOwner.id).length
  const totalRevenue = mockBookings
    .filter((b) => b.ownerId === currentOwner.id && b.status === "Completed")
    .reduce((sum, b) => sum + b.totalPrice, 0)

  const stats = [
    {
      title: "Total Cars",
      value: totalCars,
      icon: Car,
      iconColor: "text-blue-600",
    },
    {
      title: "Available",
      value: availableCars,
      icon: Settings2,
      iconColor: "text-green-600",
    },
    {
      title: "Total Bookings",
      value: totalBookings,
      icon: Calendar,
      iconColor: "text-purple-600",
    },
    {
      title: "Revenue",
      value: `$${totalRevenue}`,
      icon: TrendingUp,
      iconColor: "text-amber-600",
    },
  ]

  // Filtering
  const filteredCars = useMemo(() => {
    return ownerCars.filter((car) => {
      const matchesSearch =
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.carDetails.plateNumber.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || car.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [ownerCars, searchQuery, statusFilter])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      seats: "",
      transmission: "Automatic",
      fuelType: "Gasoline",
      plateNumber: "",
      image: "",
      status: "Available",
    })
    setEditingCar(null)
  }

  const openEditModal = (car: (typeof mockCars)[0]) => {
    setEditingCar(car)
    setFormData({
      name: car.name,
      price: car.price.toString(),
      seats: car.carDetails.seats.toString(),
      transmission: car.carDetails.transmission,
      fuelType: car.carDetails.fuelType,
      plateNumber: car.carDetails.plateNumber,
      image: car.image,
      status: car.status,
    })
    setEditDialogOpen(true)
  }

  const handleSave = () => {
    if (editingCar) {
      setOwnerCars((prev) =>
        prev.map((car) =>
          car.id === editingCar.id
            ? {
                ...car,
                name: formData.name,
                price: Number(formData.price),
                carDetails: {
                  seats: Number(formData.seats),
                  transmission: formData.transmission,
                  fuelType: formData.fuelType,
                  plateNumber: formData.plateNumber,
                },
                image: formData.image || car.image,
                status: formData.status as "Available" | "Unavailable",
              }
            : car,
        ),
      )
      setEditDialogOpen(false)
    } else {
      const newCar = {
        id: `${Date.now()}`,
        ownerId: currentOwner.id,
        name: formData.name,
        price: Number(formData.price),
        carDetails: {
          seats: Number(formData.seats),
          transmission: formData.transmission,
          fuelType: formData.fuelType,
          plateNumber: formData.plateNumber,
        },
        rating: 5.0,
        image: formData.image || "/classic-red-convertible.png",
        status: formData.status as "Available" | "Unavailable",
        createdAt: new Date(),
      }
      setOwnerCars((prev) => [...prev, newCar])
      setAddDialogOpen(false)
    }
    resetForm()
  }

  const handleDelete = (carId: string) => {
    setOwnerCars((prev) => prev.filter((car) => car.id !== carId))
    setDeleteConfirmId(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4 gap-2 hover:cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-slate-900">Your Fleet</h1>
          <p className="text-slate-600 mt-1">{filteredCars.length} car{filteredCars.length !== 1 ? "s" : ""} in your fleet</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              iconColor={stat.iconColor}
            />
          ))}
        </div>

        {/* Filters and Add Button */}
        <Card className="bg-transparent shadow-md mb-6 border border-slate-300">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search by name or plate..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                <Select
                  value = {statusFilter}
                  onValueChange = {(e) => setStatusFilter(e)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder = "All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value = "all">All Status</SelectItem>
                    <SelectItem value = "Available">Available</SelectItem>
                    <SelectItem value = "Unavailable">Unavailable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Dialog onOpenChange={(open) => { setAddDialogOpen(open); if (!open) resetForm(); }}>
                <DialogTrigger asChild>
                  <Button className="gap-2 w-full md:w-auto">
                    <Plus className="w-4 h-4" />
                    Add New Car
                  </Button>
                </DialogTrigger>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {filteredCars.length === 0 ? (
          <Card className="border-0 shadow-sm">
            <CardContent className="py-12">
              <div className="text-center text-slate-500">
                <Car className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No cars found. Add your first vehicle to get started.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <Card key={car.id} className="shadow-sm overflow-hidden hover:shadow-2xl transition-shadow border border-gray-300">
                <div className="relative">
                  <img
                    src={car.image || "/placeholder.svg?height=200&width=400&query=car"}
                    alt={car.name}
                    className="w-full h-48 object-cover bg-slate-100"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge
                      className={
                        car.status === "Available"
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }
                    >
                      {car.status}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900">{car.name}</h3>
                      <p className="text-sm text-slate-500 font-mono">{car.carDetails.plateNumber}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="text-sm font-medium text-amber-700">{car.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {car.carDetails.seats} seats
                    </span>
                    <span className="flex items-center gap-1">
                      <Settings2 className="w-4 h-4" />
                      {car.carDetails.transmission}
                    </span>
                    <span className="flex items-center gap-1">
                      <Fuel className="w-4 h-4" />
                      {car.carDetails.fuelType}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div>
                      <span className="text-2xl font-bold text-slate-900">${car.price}</span>
                      <span className="text-sm text-slate-500">/day</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEditModal(car)} className="gap-1">
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </Button>
                      {deleteConfirmId === car.id ? (
                        <div className="flex items-center gap-1">
                          <Button variant="destructive" size="sm" onClick={() => handleDelete(car.id)}>
                            Confirm
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setDeleteConfirmId(null)}>
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteConfirmId(car.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add Dialog Component */}
      <EditModal
        open={addDialogOpen}
        onOpenChange={(open) => { setAddDialogOpen(open); if (!open) resetForm(); }}
        formData={formData}
        onInputChange={handleInputChange}
        onSave={handleSave}
        mode="add"
      />

      {/* Edit Dialog Component */}
      <EditModal
        open={editDialogOpen}
        onOpenChange={(open) => { setEditDialogOpen(open); if (!open) resetForm(); }}
        formData={formData}
        onInputChange={handleInputChange}
        onSave={handleSave}
        mode="edit"
      />
    </div>
  )
}
