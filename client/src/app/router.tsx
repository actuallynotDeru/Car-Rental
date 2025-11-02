import { Routes, Route} from 'react-router-dom'

import MainPage from './pages/MainPage'
import Rental from './pages/Rental'
import Products from './pages/ProductPage'

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
                path = "/products"
                element = {
                    <Products />
                }
            />

        </Routes>
        

            
    )
}