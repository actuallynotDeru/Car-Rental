"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { mockCars, mockUsers, mockBookings } from "@/lib/mock-data"
import { Car, Plus, Search, Edit2, Trash2, Fuel, Users, Settings2, Star, TrendingUp, Calendar, ArrowLeft } from "lucide-react"

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
    }
    setEditDialogOpen(false)
    resetForm()
  }

  const handleDelete = (carId: string) => {
    setOwnerCars((prev) => prev.filter((car) => car.id !== carId))
    setDeleteConfirmId(null)
  }

  const toggleAvailability = (carId: string) => {
    setOwnerCars((prev) =>
      prev.map((car) =>
        car.id === carId ? { ...car, status: car.status === "Available" ? "Unavailable" : "Available" } : car,
      ),
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-slate-900">My Fleet</h1>
          <p className="text-slate-600 mt-1">Manage your vehicles and track performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-sm bg-transparent border border-gray-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-900">Total Cars</p>
                  <p className="text-2xl font-bold text-slate-900">{totalCars}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Car className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm bg-transparent border border-gray-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-900">Available</p>
                  <p className="text-2xl font-bold text-slate-900">{availableCars}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Settings2 className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm bg-transparent border border-gray-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-900">Total Bookings</p>
                  <p className="text-2xl font-bold text-slate-900">{totalBookings}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm bg-transparent border border-gray-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-900">Revenue</p>
                  <p className="text-2xl font-bold text-slate-900">${totalRevenue}</p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Add Button */}
        <Card className="border-0 shadow-sm mb-6">
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
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>
              <Dialog onOpenChange={(open) => !open && resetForm()}>
                <DialogTrigger asChild>
                  <Button className="gap-2 w-full md:w-auto">
                    <Plus className="w-4 h-4" />
                    Add New Car
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Vehicle</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g., Toyota Camry 2024"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Price per Day ($)</label>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          placeholder="75"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Seats</label>
                        <input
                          type="number"
                          name="seats"
                          value={formData.seats}
                          onChange={handleInputChange}
                          placeholder="5"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Transmission</label>
                        <select
                          name="transmission"
                          value={formData.transmission}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Automatic">Automatic</option>
                          <option value="Manual">Manual</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Fuel Type</label>
                        <select
                          name="fuelType"
                          value={formData.fuelType}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Gasoline">Gasoline</option>
                          <option value="Diesel">Diesel</option>
                          <option value="Electric">Electric</option>
                          <option value="Hybrid">Hybrid</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Plate Number</label>
                      <input
                        type="text"
                        name="plateNumber"
                        value={formData.plateNumber}
                        onChange={handleInputChange}
                        placeholder="e.g., ABC-1234"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Image URL (optional)</label>
                      <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        placeholder="https://example.com/car-image.jpg"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Available">Available</option>
                        <option value="Unavailable">Unavailable</option>
                      </select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleSave} className="gap-2">
                      Add Vehicle
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Your Vehicles</h2>
          <p className="text-sm text-slate-600">
            {filteredCars.length} car{filteredCars.length !== 1 ? "s" : ""} in your fleet
          </p>
        </div>

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
              <Card key={car.id} className="border-0 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <img
                    src={car.image || "/placeholder.svg?height=200&width=400&query=car"}
                    alt={car.name}
                    className="w-full h-48 object-cover bg-slate-100"
                  />
                  <button onClick={() => toggleAvailability(car.id)} className="absolute top-3 right-3">
                    <Badge
                      className={
                        car.status === "Available"
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }
                    >
                      {car.status}
                    </Badge>
                  </button>
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

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Vehicle</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Toyota Camry 2024"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Price per Day ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="75"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Seats</label>
                  <input
                    type="number"
                    name="seats"
                    value={formData.seats}
                    onChange={handleInputChange}
                    placeholder="5"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Transmission</label>
                  <select
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Fuel Type</label>
                  <select
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Gasoline">Gasoline</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Plate Number</label>
                <input
                  type="text"
                  name="plateNumber"
                  value={formData.plateNumber}
                  onChange={handleInputChange}
                  placeholder="e.g., ABC-1234"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Image URL (optional)</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/car-image.jpg"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>
            </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="gap-2">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
