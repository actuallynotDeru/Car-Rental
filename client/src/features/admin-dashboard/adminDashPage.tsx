import MetricGrid, { type Metric } from "@/components/admin/ui/MetricGrid"
import { Card } from "@/components/ui/card"
import { mockBookings, mockCars } from "@/lib/mock-data"
import { Users, CarIcon, BriefcaseBusiness, DollarSign } from "lucide-react"

const AdminDashboard = () => {
    // Replace the hardcoded numbers with fetched counts when API is ready.
    const metrics: Metric[] = [
        {
            title: "Total Users",
            metric: 1240,
            metricDescription: "All registered users",
            icon: <Users />
        },

        {
            title: "Active Cars",
            metric: 86,
            metricDescription: "Available for rent",
            icon: <CarIcon />
        },

        {
            title: "Bookings (30d)",
            metric: 312,
            metricDescription: "Completed in last 30 days",
            icon: <BriefcaseBusiness />
        },

        {
            title: "Total Revenue (30d)",
            metric: 1625,
            metricDescription: "Made in the last 30 days",
            icon: <DollarSign />
        }
    ]

    return(
        <>
            <div className = "flex-1 overflow-auto px-8 space-y-4">
                <h1 className = "text-3xl font-bold text-foreground mb-2">Dashboard</h1>
                <p className = "text-muted-foreground">Business Overview</p>

                <div className = "mb-8">
                    <MetricGrid 
                        metrics = {metrics}
                        className= "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    />
                </div>

                <div className = "grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className = "p-6">
                        <h3 className = "text-lg font-semibold text-foreground mb-4">Recent Bookings</h3>
                        <div className = "space-y-3">
                            {mockBookings.slice(0, 3).map((booking) => (
                                <div key = {booking.id} className = "flex items-center justify-between p-3 bg-muted rounded-lg">
                                    <div>
                                        <p className = "font-medium text-foreground">Booking #{booking.id}</p>
                                        <p className = "text-sm text-muted-foreground">{booking.status}</p>
                                    </div>
                                    <p className = "font-semibold text-foreground">${booking.totalPrice}</p>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className = "p-6">
                        <h3 className = "text-lg font-semibold text-foreground mb-4">Available Cars</h3>
                        <div className = "space-y-3">
                            {mockCars
                                .filter((car) => car.status === 'Available')
                                .slice(0, 3)
                                .map((car) => (
                                    <div key = {car.id} className = "flex items-center justify-between p-3 bg-muted rounded-lg">
                                        <div>
                                            <p className = "font-medium text-foreground">{car.name}</p>
                                            <p className = "text-sm text-muted-foreground">{car.rating}</p>
                                        </div>
                                        <p className = "font-semibold text-foreground">${car.price}/day</p>
                                    </div>
                                ))
                            }
                        </div>
                    </Card>
                </div>
            </div>
        </>

    )
}

export default AdminDashboard