import type React from "react"
import { useState, useMemo, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Car, Plus, Search, Edit2, Trash2, Fuel, Users, Settings2, Star, TrendingUp, Calendar, ArrowLeft, Loader2 } from "lucide-react"
import StatCard from "./components/stat-cards"
import EditModal from "./components/edit-modal"
import { FleetAPI } from "./api/fleet.api"
import type { Car as CarType } from "./types/fleet.types"
import { Error, Loading } from "./components/status"
import { motion } from "framer-motion"
import { FleetAnimations } from "./animations/fleet.animations"

interface UserData {
  _id: string
  role: string
}

const MotionCard = motion.create(Card);

export default function FleetPage() {
  const { userId } = useParams<{ userId: string }>();
  const currentOwnerId = userId
  const navigate = useNavigate()

  const [user, setUser] = useState<UserData | null>(null)
  const [ownerCars, setOwnerCars] = useState<CarType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [editingCar, setEditingCar] = useState<CarType | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)

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
  
  useEffect(() => {
    const userStr = localStorage.getItem('user')
    if(userStr) {
      try {
        const userData = JSON.parse(userStr)
        setUser(userData)
      } catch(err) {
        console.error("Error parsing user data: ", err);
      }
    }
    setAuthChecked(true);
  }, [])
  
  useEffect(() => {
    if (!authChecked) return;
    
    if (!user || user.role !== "CarOwner") navigate("/");
  }, [authChecked, user, navigate])

  // Fetch cars on mount
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true)
        setError(null)
        
        if(!currentOwnerId) {
          throw new Error("No owner Id");
        }
        
        const data = await FleetAPI.getCarsByOwner(currentOwnerId)
        setOwnerCars(data)
      } catch (err) {
        setError("Failed to load your fleet. Please try again.")
        console.error("Error fetching fleet:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [currentOwnerId])

  // Calculate stats
  const totalCars = ownerCars.length
  const availableCars = ownerCars.filter((c) => c.status === "Available").length
  const totalBookings = 0 // This would need booking data
  const totalRevenue = 0 // This would need booking data

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

  const openEditModal = (car: CarType) => {
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

  const handleSave = async () => {
    try {
      const carData = {
        name: formData.name,
        price: Number(formData.price),
        carDetails: {
          seats: Number(formData.seats),
          transmission: formData.transmission,
          fuelType: formData.fuelType,
          plateNumber: formData.plateNumber,
        },
        image: formData.image || "/placeholder-car.png",
        status: formData.status as "Available" | "Unavailable",
      }

      if (editingCar) {
        // Update existing car
        const updated = await FleetAPI.updateCar(editingCar._id!, carData)
        setOwnerCars((prev) =>
          prev.map((car) => (car._id === editingCar._id ? updated : car))
        )
        setEditDialogOpen(false)
      } else {
        // Create new car
        const newCar = await FleetAPI.createCar({
          ...carData,
          ownerId: currentOwnerId,
          rating: 5.0,
        })
        setOwnerCars((prev) => [...prev, newCar])
        setAddDialogOpen(false)
      }
      resetForm()
    } catch (err) {
      console.error("Error saving car:", err)
      alert("Failed to save car. Please try again.")
    }
  }

  const handleDelete = async (carId: string) => {
    try {
      await FleetAPI.deleteCar(carId)
      setOwnerCars((prev) => prev.filter((car) => car._id !== carId))
      setDeleteConfirmId(null)
    } catch (err) {
      console.error("Error deleting car:", err)
      alert("Failed to delete car. Please try again.")
    }
  }

  if (loading) {
    return (
      <Loading />
    )
  }

  if (error) {
    return (
      <Error err = {error} />
    )
  }

  return (
    <motion.div variants={FleetAnimations.container} initial = "hidden" animate = "visible" className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div variants={FleetAnimations.header} initial = "hidden" animate = "visible" className="mb-8">
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
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={FleetAnimations.statsGrid} initial = "hidden" animate = "visible" className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              iconColor={stat.iconColor}
            />
          ))}
        </motion.div>

        {/* Filters and Add Button */}
        <MotionCard variants={FleetAnimations.filtersCard} initial = "hidden" animate = "visible" className="bg-transparent shadow-md mb-6 border border-slate-300">
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
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Unavailable">Unavailable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                className="gap-2 w-full md:w-auto"
                onClick={() => {
                  resetForm()
                  setAddDialogOpen(true)
                }}
              >
                <Plus className="w-4 h-4" />
                Add New Car
              </Button>
            </div>
          </CardContent>
        </MotionCard>

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
          <motion.div variants={FleetAnimations.carsGrid} initial = "hidden" animate = "visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <MotionCard variants={FleetAnimations.carCard} initial = "hidden" animate = "visible" whileHover = {FleetAnimations.carCardHover.hover} key={car._id} className="shadow-sm overflow-hidden hover:shadow-2xl transition-shadow border border-gray-300">
                <div className="relative">
                  <motion.img
                    variants={FleetAnimations.carImage} initial = "hidden" animate = "visible"
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
                      {deleteConfirmId === car._id ? (
                        <div className="flex items-center gap-1">
                          <Button variant="destructive" size="sm" onClick={() => handleDelete(car._id!)}>
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
                          onClick={() => setDeleteConfirmId(car._id!)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </MotionCard>
            ))}
          </motion.div>
        )}
      </div>

      {/* Add Dialog */}
      <EditModal
        open={addDialogOpen}
        onOpenChange={(open) => {
          setAddDialogOpen(open)
          if (!open) resetForm()
        }}
        formData={formData}
        onInputChange={handleInputChange}
        onSave={handleSave}
        mode="add"
      />

      {/* Edit Dialog */}
      <EditModal
        open={editDialogOpen}
        onOpenChange={(open) => {
          setEditDialogOpen(open)
          if (!open) resetForm()
        }}
        formData={formData}
        onInputChange={handleInputChange}
        onSave={handleSave}
        mode="edit"
      />
    </motion.div>
  )
}