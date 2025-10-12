import { Routes, Route} from 'react-router-dom'

import MainPage from './pages/MainPage'

export default function AppRouter() {
    return (
        <Routes>
            <Route 
                path = "/"
                element = {
                    <MainPage />
                }
            />
        </Routes>
    )
}