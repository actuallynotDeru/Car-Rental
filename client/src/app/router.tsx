import { Routes, Route} from 'react-router-dom'

import MainPage from './pages/MainPage'
import Rental from './pages/Rental'
import AdminPage from './pages/AdminDashboard'
import AdminLayout from './layout/adminLayout'
import AdminCars from './pages/AdminCars'
import AdminUsersPage from './pages/AdminUsers'

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
        </Routes>
    )
}