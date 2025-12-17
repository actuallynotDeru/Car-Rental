import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sun, User } from "lucide-react";

interface UserData {
  _id: string
  fullName: string
  email: string
  role: string
  status: string
  city: string
}


const Header = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const navigate = useNavigate();
  
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
  }, [])
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate("/");
  }
  
  const getRoleBasedButtons = () => {
      if (!user) {
          return (
              <>
                  <a href="/signup" className="hover:underline">Sign Up</a>
                  <a href="/login" className="hover:underline">Log In</a>
              </>
          )
      }

      const commonButtons = (
          <>
              <a href="/account" className="hover:underline">Profile</a>
              <a href={`/Customize_account/${user._id}`} className="hover:underline">Settings</a>
              <button onClick={handleLogout} className="hover:underline cursor-pointer">Log Out</button>
          </>
      )

      if (user.role === 'CarOwner') {
          return (
              <>
                  <a href={`/fleet/${user._id}`} className="hover:underline">My Fleet</a>
                  <a href={`/booking/review/${user._id}`} className="hover:underline">Booking Requests</a>
                  {commonButtons}
              </>
          )
      }

      if (user.role === 'Customer') {
          return (
              <>
                  <a href="/rental" className="hover:underline">Rent a Car</a>
                  <a href="/application/form" className="hover:underline">Become a Car Owner</a>
                  {commonButtons}
              </>
          )
      }

      if (user.role === 'Admin') {
          return (
              <>
                  <a href="/admin" className="hover:underline">Dashboard</a>
                  {commonButtons}
              </>
          )
      }

      return commonButtons
  }
  
  return(
      <div className="flex justify-between bg-blue-400 py-4 text-white">
          <div className = "px-8">
              <p className = "text-2xl font-semibold">LOGO HERE</p>
          </div>

          <div className = "px-8 space-x-8 flex text-white self-center">
            { user && (
              <div className = "flex items-center gap-2">
                <User size={18} />
                <span>{ user.fullName }</span>
              </div>
            )}
            {getRoleBasedButtons()}
          </div>
          
          <div />
      </div>
  )
}

export default Header;