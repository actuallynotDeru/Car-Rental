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
import ProfileCustomization from './pages/ProfileCustomizationPage'
import ApplicationFormPage from './pages/ApplicationForm'
import FleetPage from './pages/Fleet'
import BookingApplicationPage from './pages/BookingApplication'
import LoginPage from './pages/LoginForm'
import SignupPage from './pages/SignupForm'
import Profile from './pages/ProfilePage'
import PaymentPage from './pages/Payment'

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
                path = "/login"
                element = {
                    <LoginPage />
                }
            />

            <Route 
                path = "/signup"
                element = {
                    <SignupPage/>
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
                path = "/products/:carId"
                element = {
                    <Products />
                }
            />

            <Route 
                path = "/payment"
                element = {
                    <PaymentPage />
                }
            />

            <Route 
                path = "/account"
                element = {
                    <Profile/>
                }
            />

            <Route 
                path = "/Customize_account/:userId"
                element = {
                    <ProfileCustomization />
                }
            />

            <Route 
                path = "/application/form"
                element = {
                    <ApplicationFormPage />
                }
            />

            <Route 
                path = "/fleet/:userId"
                element = {
                    <FleetPage />
                }
            />
            
            <Route 
            path = "/booking/review/:userId"
            element = {
              <BookingApplicationPage />
            }
            />

        </Routes>
        

            
    )
}