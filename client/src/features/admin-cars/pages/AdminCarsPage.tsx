"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { mockCars } from "@/lib/mock-data"
import { Edit2, Trash2, Plus, X } from "lucide-react"
import { useState, useMemo } from "react"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu"

export default function CarsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    status: "",
    transmission: "",
    fuelType: "",
  })

  const filteredCars = useMemo(() => {
    return mockCars.filter((car) => {
      const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = !filters.status || car.status === filters.status
      const matchesTransmission = !filters.transmission || car.carDetails.transmission === filters.transmission
      const matchesFuelType = !filters.fuelType || car.carDetails.fuelType === filters.fuelType

      return matchesSearch && matchesStatus && matchesTransmission && matchesFuelType
    })
  }, [searchTerm, filters])

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const clearFilters = () => {
    setSearchTerm("")
    setFilters({ status: "", transmission: "", fuelType: "" })
  }

  const hasActiveFilters = searchTerm || Object.values(filters).some((v) => v)

  return (
        <div className="flex-1 overflow-auto p-8">
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
                            <select
                                value={filters.status}
                                onChange={(e) => handleFilterChange("status", e.target.value)}
                                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground text-sm"
                            >
                                <option value="">All</option>
                                <option value="Available">Available</option>
                                <option value="Unavailable">Unavailable</option>
                            </select>
                        </div>

                        <div className="min-w-[150px]">
                            <label className="text-sm font-medium text-foreground mb-1 block">Transmission</label>
                            <select
                                value={filters.transmission}
                                onChange={(e) => handleFilterChange("transmission", e.target.value)}
                                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground text-sm"
                            >
                                <option value="">All</option>
                                <option value="Manual">Manual</option>
                                <option value="Automatic">Automatic</option>
                            </select>
                        </div>

                        <div className="min-w-[150px]">
                            <label className="text-sm font-medium text-foreground mb-1 block">Fuel Type</label>
                            <select
                                value={filters.fuelType}
                                onChange={(e) => handleFilterChange("fuelType", e.target.value)}
                                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground text-sm"
                            >
                                <option value="">All</option>
                                <option value="Gasoline">Gasoline</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Electric">Electric</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>

                        {hasActiveFilters && (
                        <Button variant="outline" size="sm" onClick={clearFilters} className="gap-2 bg-transparent">
                            <X className="w-4 h-4" />
                            Clear Filters
                        </Button>
                        )}
                    </div>
                </div>
            </Card>

            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border bg-muted">
                                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Car Name</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Seats</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Transmission</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Fuel Type</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Plate Number</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Price/Day</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Rating</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCars.length > 0 ? (
                                filteredCars.map((car) => (
                                <tr key={car.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-foreground">{car.name}</td>
                                    <td className="px-6 py-4 text-sm text-foreground">{car.carDetails.seats}</td>
                                    <td className="px-6 py-4 text-sm text-foreground">{car.carDetails.transmission}</td>
                                    <td className="px-6 py-4 text-sm text-foreground">{car.carDetails.fuelType}</td>
                                    <td className="px-6 py-4 text-sm text-foreground">{car.carDetails.plateNumber}</td>
                                    <td className="px-6 py-4 text-sm text-foreground">${car.price}</td>
                                    <td className="px-6 py-4 text-sm text-foreground">⭐ {car.rating}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            car.status === "Available" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {car.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="sm">
                                                <Edit2 className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="text-destructive">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={9} className="h-24 text-center text-muted-foreground">
                                        No cars found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            <div className="mt-4 text-sm text-muted-foreground">
                Showing {filteredCars.length} of {mockCars.length} cars
            </div>
        </div>
  )
}