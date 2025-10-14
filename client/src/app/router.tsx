import { Routes, Route} from 'react-router-dom'

import MainPage from './pages/MainPage'
import Rental from './pages/Rental'

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
        </Routes>
    )
}