import { Sun } from "lucide-react";

const TransparentHeader = () => {
    return(
        <div className="flex justify-between bg-transparent py-4 text-white">
            <div className = "px-8">
                <p className = "text-2xl font-semibold">LOGO HERE</p>
            </div>

            <div className = "px-8 space-x-8 flex text-white self-center">
                <p>Rent</p>
                <p>About</p>
                <p>Locations</p>
            </div>

            <div className = "px-8 space-x-8 flex text-white self-center">
                <Sun size = {20} className = "self-center"/>
                <p>Sign Up</p>
                <p>Log In</p>
            </div>
        </div>
    )
}

export default TransparentHeader;