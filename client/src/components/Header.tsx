import { Sun } from "lucide-react";


const Header = () => {
    
    return(
        <div className="flex justify-between bg-blue-400 py-4 text-white">
            <div className = "px-8">
                <p className = "text-2xl font-semibold">LOGO HERE</p>
            </div>

            <div className = "px-8 space-x-8 flex text-white self-center">
                <a href="/rental">Rent</a>
                <a href="">About</a>
                <a href="">List Your Car</a>
            </div>

            <div className = "px-8 space-x-8 flex text-white self-center">
                <Sun size = {20} className = "self-center"/>
                <a href="/signup">Sign Up</a>
                <a href="/login">Log In</a>
            </div>
        </div>
    )
}

export default Header;