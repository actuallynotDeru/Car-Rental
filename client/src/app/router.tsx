import { Routes, Route} from 'react-router-dom'

import MainPage from './pages/MainPage'
import Rental from './pages/Rental'
import AdminPage from './pages/AdminDashboard'
import AdminLayout from './layout/adminLayout'
import AdminCars from './pages/AdminCars'
import AdminUsersPage from './pages/AdminUsers'
import AdminBookings from './pages/AdminBookings'
import AdminUserApplication from './pages/AdminUserApplication'
import Products from './pages/ProductPage'
import Profile from './pages/ProfilePage'
import ApplicationFormPage from './pages/ApplicationForm'
import FleetPage from './pages/Fleet'
import BookingApplicationPage from './pages/BookingApplication'

export default function AppRouter() {
    return (
        <Routes>
            <Route 
                path = "/"
                element = {
                    <MainPage />
                }
            />

            <Route 
                path = "/rental"
                element = {
                    <Rental />
                }
            />

            <Route 
                path = "/admin"
                element = {
                    <AdminLayout>
                        <AdminPage />
                    </AdminLayout>
                }
            />

            <Route 
                path = "/admin/cars"
                element = {
                    <AdminLayout>
                        <AdminCars />
                    </AdminLayout>
                }
            />

            <Route 
                path = "/admin/users"
                element = {
                    <AdminLayout>
                        <AdminUsersPage />
                    </AdminLayout>
                }
            />

            <Route 
                path = "/admin/bookings"
                element = {
                    <AdminLayout>
                        <AdminBookings />
                    </AdminLayout>
                }
            />

            <Route 
                path = "/admin/application"
                element = {
                    <AdminLayout>
                        <AdminUserApplication />
                    </AdminLayout>
                }
            />
            
            <Route 
                path = "/products"
                element = {
                    <Products />
                }
            />

            <Route 
                path = "/profile"
                element = {
                    <Profile />
                }
            />

            <Route 
                path = "/application/form"
                element = {
                    <ApplicationFormPage />
                }
            />

            <Route 
                path = "/fleet"
                element = {
                    <FleetPage />
                }
            />
            
            <Route 
            path = "/booking/review"
            element = {
              <BookingApplicationPage />
            }
            />

        </Routes>
        

            
    )
}