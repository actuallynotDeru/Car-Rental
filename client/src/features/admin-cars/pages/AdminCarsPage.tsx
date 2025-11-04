import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { mockCars } from "@/lib/mock-data"
import { Plus, X } from "lucide-react"
import { useState, useMemo } from "react"
import { Label } from "@/components/ui/label"
import { Carcolumns } from "../components/cars-columns"
import { CarsDataTable } from "../components/cars-data-table"

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
                            <Label className="text-sm font-medium text-foreground mb-1 block">Transmission</Label>
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
                            <Label className="text-sm font-medium text-foreground mb-1 block">Fuel Type</Label>
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

            <CarsDataTable columns={Carcolumns} data={filteredCars} />
        </div>
  )
}