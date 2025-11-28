import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Plus, X } from "lucide-react"
import { useState, useMemo, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Carcolumns } from "./components/cars-columns"
import { CarsDataTable } from "./components/cars-data-table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getCars } from "./api/car.api"
import type { Car } from "./types/cars.types"

export default function CarsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    status: "all",
    transmission: "all",
    fuelType: "all",
  })
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchCars = async() => {
      try {
        setLoading(true)
        setError(null)
        const data = await getCars()
        setCars(data)
      } catch(error) {
        setError("Failed to load cars. Please try again")
        console.error("Error fetching users: ", error);
      } finally {
        setLoading(false)
      }
    }
    fetchCars()
  }, [])

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filters.status === "all" || car.status === filters.status
      const matchesTransmission = filters.transmission === "all" || car.carDetails.transmission === filters.transmission
      const matchesFuelType = filters.fuelType === "all" || car.carDetails.fuelType === filters.fuelType

      return matchesSearch && matchesStatus && matchesTransmission && matchesFuelType
    })
  }, [cars, searchTerm, filters])

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const clearFilters = () => {
    setSearchTerm("")
    setFilters({ status: "all", transmission: "all", fuelType: "all" })
  }

  const hasActiveFilters = searchTerm || Object.values(filters).some((v) => v !== "all")

  if(loading) {
    return (
      <div className = "flex-1 flex items-center justify-center">
        <p className = "text-muted-foreground">Loading users...</p>
      </div>
    )
  }
  
  if(error) {
    return(
      <div className = "flex-1 flex items-center justify-center">
        <p className = "text-destructive">{ error }</p>
      </div>
    )
  }
  
  return (
    <div className="flex-1 overflow-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Cars Management</h1>
          <p className="text-muted-foreground">Manage all vehicles in your fleet</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Car
        </Button>
      </div>

      <Card className="p-6 mb-6">
        <div className="space-y-3">
          <div className="flex gap-2 flex-wrap items-end">
            <div className="flex-1 min-w-[200px]">
              <Label className="text-sm font-medium text-foreground mb-1 block">Search</Label>
              <Input
                placeholder="Search cars..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="min-w-[150px]">
              <Label className="text-sm font-medium text-foreground mb-1 block">Status</Label>
              <Select
                value={filters.status}
                onValueChange={(value) => handleFilterChange("status", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Unavailable">Unavailable</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="min-w-[150px]">
              <Label className="text-sm font-medium text-foreground mb-1 block">Transmission</Label>
              <Select
                value={filters.transmission}
                onValueChange={(value) => handleFilterChange("transmission", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Manual">Manual</SelectItem>
                  <SelectItem value="Automatic">Automatic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="min-w-[150px]">
              <Label className="text-sm font-medium text-foreground mb-1 block">Fuel Type</Label>
              <Select
                value={filters.fuelType}
                onValueChange={(value) => handleFilterChange("fuelType", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Gasoline">Gasoline</SelectItem>
                  <SelectItem value="Diesel">Diesel</SelectItem>
                  <SelectItem value="Electric">Electric</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="gap-2 bg-transparent"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </Card>

      <CarsDataTable columns={Carcolumns} data={filteredCars} />
    </div>
  )
}