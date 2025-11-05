import BookingsDataTable from "./components/bookings-data-table"
import { bookingColumns, type BookingTableRow } from "./components/bookings-columns"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockBookings, mockCars, mockUsers } from "@/lib/mock-data"
import { X } from "lucide-react"
import { useState, useMemo } from "react"
import { Label } from "@/components/ui/label"

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
        status: "",
    })

    const filteredBookings = useMemo(() => {
        return mockBookings.filter((booking) => {
            const matchesSearch = 
                booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                getCustomerName(booking.customerId).toLowerCase().includes(searchTerm.toLowerCase()) ||
                getCarName(booking.carId).toLowerCase().includes(searchTerm.toLowerCase())
            const matchesStatus = !filters.status || booking.status === filters.status

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
        setSearchTerm(""),
        setFilters({
            status: ""
        })
    }

    const hasActiveFilters = searchTerm || Object.values(filters).some((v) => v)

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
                                <select
                                    value = {filters.status}
                                    onChange = {(e) => handleFilterChange("status", e.target.value)}
                                    className = "w-full px-3 p-2 border border-input rounded-md bg-background text-foreground text-sm"
                                >
                                    <option value="">All</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
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