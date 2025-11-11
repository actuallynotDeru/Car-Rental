import BookingsDataTable from "./components/bookings-data-table"
import { bookingColumns, type BookingTableRow } from "./components/bookings-columns"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockBookings, mockCars, mockUsers } from "@/lib/mock-data"
import { X } from "lucide-react"
import { useState, useMemo } from "react"
import { Label } from "@/components/ui/label"
import { 
    Select, 
    SelectTrigger, 
    SelectValue, 
    SelectContent, 
    SelectItem 
} from "@/components/ui/select"

const getCarName = (carId: string) => {
    return mockCars.find((c) => c.id === carId)?.name || "Unknown"
}

const getCustomerName = (customerId: string) => {
    return mockUsers.find((u) => u.id === customerId)?.fullName || "Unknown"
}

const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    })
}

const AdminBookingPage = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [filters, setFilters] = useState({
        status: "all",
    })

    const filteredBookings = useMemo(() => {
        return mockBookings.filter((booking) => {
            const matchesSearch = 
                booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                getCustomerName(booking.customerId).toLowerCase().includes(searchTerm.toLowerCase()) ||
                getCarName(booking.carId).toLowerCase().includes(searchTerm.toLowerCase())
            const matchesStatus = filters.status === "all" || booking.status === filters.status

            return matchesSearch && matchesStatus
        })
    }, [searchTerm, filters])

    const tableData = useMemo<BookingTableRow[]>(() => {
        return filteredBookings.map((booking) => ({
            ...booking,
            customerName: getCustomerName(booking.customerId),
            carName: getCarName(booking.carId),
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