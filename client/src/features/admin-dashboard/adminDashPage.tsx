import { useState, useEffect } from "react"
import MetricGrid, { type Metric } from "@/components/admin/ui/MetricGrid"
import { Card } from "@/components/ui/card"
import { Users, CarIcon, BriefcaseBusiness, DollarSign } from "lucide-react"
import type { User, Car, Bookings } from "./types/dashboard.types"
import { getUsers } from "../admin-users/api/user.api"
import { getCars } from "../admin-cars/api/car.api"
import { getBookings } from "../admin-bookings/api/bookings.api"
import { motion } from "framer-motion"
import { DashboardAnimations } from "./animations/admin-dashboard.animations"
import { useNavigate } from "react-router-dom"

interface UserData {
  _id: string
  role: string
}

const MotionCard = motion(Card);

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([])
  const [cars, setCars] = useState<Car[]>([])
  const [bookings, setBookings] = useState<Bookings[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<UserData | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();
  
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
  
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if(userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
      } catch(err) {
        console.error("Error parsing user data: ", err);
      }
    }
    setAuthChecked(true);
  }, [])
  
  useEffect(() => {
    if (!authChecked) return;
    
    if (!user || user.role !== "Admin") navigate("/");
  }, [authChecked, user, navigate])

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
      <motion.div variants = {DashboardAnimations.container} initial = "hidden" animate = "visible" className = "flex-1 overflow-auto px-8 space-y-4">
        <motion.div variants={DashboardAnimations.title} initial = "hidden" animate = "visible">
          <h1 className = "text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className = "text-muted-foreground">Business Overview</p>
        </motion.div>

        <motion.div variants={DashboardAnimations.metricCard} initial = "hidden" animate = "visible" className = "mb-8">
              <MetricGrid 
                  metrics = {metrics}
                  className= "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              />
          </motion.div>

          <div className = "grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MotionCard variants={DashboardAnimations.dataCard} initial = "hidden" animate = "visible" className = "p-6">
                  <h3 className = "text-lg font-semibold text-foreground mb-4">Recent Bookings</h3>
                  <div className = "space-y-3">
                      {bookings.slice(0, 3).map((booking) => (
                          <motion.div variants={DashboardAnimations.listItem} initial = "hidden" animate = "visible" key = {booking.id} className = "flex items-center justify-between p-3 bg-muted rounded-lg">
                              <div>
                                  <p className = "font-medium text-foreground">Booking #{booking.id}</p>
                                  <p className = "text-sm text-muted-foreground">{booking.status}</p>
                              </div>
                              <p className = "font-semibold text-foreground">${booking.totalPrice}</p>
                          </motion.div>
                      ))}
                  </div>
              </MotionCard>

              <MotionCard variants={DashboardAnimations.dataCard} initial = "hidden" animate = "visible" className = "p-6">
                  <h3 className = "text-lg font-semibold text-foreground mb-4">Available Cars</h3>
                  <div className = "space-y-3">
                      {cars
                          .filter((car) => car.status === 'Available')
                          .slice(0, 3)
                          .map((car) => (
                            <motion.div variants={DashboardAnimations.listItem} initial = "hidden" animate = "visible" key = {car.id} className = "flex items-center justify-between p-3 bg-muted rounded-lg">
                                  <div>
                                      <p className = "font-medium text-foreground">{car.name}</p>
                                      <p className = "text-sm text-muted-foreground">{car.rating}</p>
                                  </div>
                                  <p className = "font-semibold text-foreground">₱{car.price}/day</p>
                              </motion.div>
                          ))
                      }
                  </div>
              </MotionCard>
          </div>
      </motion.div>
    </>
  )
}

export default AdminDashboard