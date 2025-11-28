import BookingsDataTable from "./components/bookings-data-table"
import { bookingColumns, type BookingTableRow } from "./components/bookings-columns"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useState, useMemo, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { 
    Select, 
    SelectTrigger, 
    SelectValue, 
    SelectContent, 
    SelectItem 
} from "@/components/ui/select"
import { formatDate } from "./utils/format"
import { getBookings } from "./api/bookings.api"
import type { Bookings } from "./types/bookings.types"

const AdminBookingPage = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [filters, setFilters] = useState({
        status: "all",
    })
    const [bookings, setBookings] = useState<Bookings[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    
    useEffect(() => {
      const fetchBookings = async() => {
        try {
          setLoading(true)
          setError(null)
          const data = await getBookings()
          setBookings(data)
        } catch(error) {
          setError("Failed to load users. Please try again");
          console.error("Error fetching bookings: ", error);
        } finally {
          setLoading(false)
        }
      }
      fetchBookings()
    }, [])

    const filteredBookings = useMemo(() => {
        return bookings.filter((booking) => {
          const matchesSearch =
              booking.carId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              booking.customerId.fullName.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesStatus = filters.status === "all" || booking.status === filters.status

            return matchesSearch && matchesStatus
        })
    }, [bookings, searchTerm, filters])

    const tableData = useMemo<BookingTableRow[]>(() => {
        return filteredBookings.map((booking) => ({
            ...booking,
            customerName: booking.customerId.fullName,
            carName: booking.carId.name,
            startDateLabel: booking.pickupDate ? formatDate(booking.pickupDate) : "-",
            endDateLabel: booking.returnDate ? formatDate(booking.returnDate) : "-", 
        }))
    }, [filteredBookings])

    const handleFilterChange = (key: string, value: string) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    const clearFilters = () => {
        setSearchTerm("")
        setFilters({
            status: "all"
        })
    }

    const hasActiveFilters = searchTerm || Object.values(filters).some((v) => v !== "all")

    if(loading) {
      return (
        <div className = "flex-1 flex items-center justify-center">
          <p className = "text-muted-foreground">Loading bookings...</p>
        </div>
      )
    }
    
    if(error) {
      return(
        <div className = "flex-1 flex items-center justify-center">
          <p className="text-destructive">{error}</p>
        </div>
      )
    }
    
    return(
        <>
            <div className = "flex-1 overflow-auto p-8">
                <div className = "mb-8">
                    <h1 className = "text-3xl font-bold text-foreground mb-2">Bookings Management</h1>
                    <p className = "text-muted-foreground">View and manage all car rental bookings</p>
                </div>

                <Card className = "p-6 mb-6">
                    <div className = "space-y-3">
                        <div className="flex gap-2 flex-wrap items-end">
                            <div className = "flex-1 min-w-[200px]">
                                <Label className = "text-sm font-medium text-foreground mb-1 block">Search</Label>
                                <Input 
                                    placeholder = "Search bookings..."
                                    value = {searchTerm}
                                    onChange = {(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className = "min-w-[150px]">
                                <Label className = "text-sm font-medium text-foreground mb-1 block">Status</Label>
                                <Select value = {filters.status} onValueChange = {(e) => handleFilterChange("status", e)}>
                                    <SelectTrigger className = "w-full">
                                        <SelectValue placeholder = "All" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value = "all">All</SelectItem>
                                        <SelectItem value = "Pending">Pending</SelectItem>
                                        <SelectItem value = "Confirmed">Confirmed</SelectItem>
                                        <SelectItem value = "Completed">Completed</SelectItem>
                                        <SelectItem value = "Cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {hasActiveFilters && (
                                <Button variant = "outline" size = "sm" onClick = {clearFilters} className = "gap-2 bg-transparent">
                                    <X className = "size-4"/>
                                    Clear Filters
                                </Button>
                            )}
                        </div>
                    </div>
                </Card>

                <BookingsDataTable  columns = {bookingColumns} data = {tableData}/>
            </div>
        </>
    )
}

export default AdminBookingPage