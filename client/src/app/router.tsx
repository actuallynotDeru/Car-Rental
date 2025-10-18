import { Routes, Route} from 'react-router-dom'

import MainPage from './pages/MainPage'
import Rental from './pages/Rental'
import AdminPage from './pages/AdminDashboard'
import AdminLayout from './layout/adminLayout'

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
        </Routes>
    )
}