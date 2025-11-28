import { useState, useEffect } from "react"
import MetricGrid, { type Metric } from "@/components/admin/ui/MetricGrid"
import { Card } from "@/components/ui/card"
import { mockBookings, mockCars } from "@/lib/mock-data"
import { Users, CarIcon, BriefcaseBusiness, DollarSign } from "lucide-react"
import type { User, Car, Bookings } from "./types/dashboard.types"
import { getUsers } from "../admin-users/api/user.api"
import { getCars } from "../admin-cars/api/car.api"
import { getBookings } from "../admin-bookings/api/bookings.api"

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([])
  const [cars, setCars] = useState<Car[]>([])
  const [bookings, setBookings] = useState<Bookings[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchData = async() => {
      try {
        setLoading(true)
        const [usersData, carsData, bookingsData] = await Promise.all([
          getUsers(),
          getCars(),
          getBookings(),
        ]);
        
        setUsers(usersData)
        setCars(carsData)
        setBookings(bookingsData)
      } catch(error) {
        console.error("Error fetching dashboard data: ", error);
      } finally {
        setLoading(false)
      }
    }
    fetchData();
  }, [])

  // Replace the hardcoded numbers with fetched counts when API is ready.
  const metrics: Metric[] = [
      {
          title: "Total Users",
          metric: users.length,
          metricDescription: "All registered users",
          icon: <Users />
      },

      {
          title: "Active Cars",
          metric: cars.filter(c => c.status === "Available").length,
          metricDescription: "Available for rent",
          icon: <CarIcon />
      },

      {
          title: "Bookings (30d)",
          metric: bookings.length,
          metricDescription: "Completed in last 30 days",
          icon: <BriefcaseBusiness />
      },

      {
          title: "Total Revenue (30d)",
          metric: bookings.reduce((sum, b) => sum + b.totalPrice, 0),
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
                          {bookings.slice(0, 3).map((booking) => (
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
                          {cars
                              .filter((car) => car.status === 'Available')
                              .slice(0, 3)
                              .map((car) => (
                                  <div key = {car.id} className = "flex items-center justify-between p-3 bg-muted rounded-lg">
                                      <div>
                                          <p className = "font-medium text-foreground">{car.name}</p>
                                          <p className = "text-sm text-muted-foreground">{car.rating}</p>
                                      </div>
                                      <p className = "font-semibold text-foreground">₱{car.price}/day</p>
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