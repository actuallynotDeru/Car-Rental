import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ProfileContainer from "./components/profile-container";
import PreviouslyBooked from "./components/PreviouslyBooked-Container";
import { motion } from "framer-motion";
import { ProfileAnimations } from "./animations/profile.animations";
import { useNavigate } from "react-router-dom";

interface UserData {
  _id: string
  role: string
}

const ProfilePage = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if(userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
      } catch(err) {
        console.error("error parsing user data: ", err);
      }
    }
    setAuthChecked(true);
  }, [])
  
  useEffect(() => {
    if (!authChecked) return;
    
    if (!user) navigate("/");
  }, [authChecked, user, navigate])
  
  return(
    <>
      <motion.div variants={ProfileAnimations.container} initial = "hidden" animate = "visible">
        <motion.div variants={ProfileAnimations.header} initial = "hidden" animate = "visible">
          <Header />
        </motion.div>

        <div className="w-full flex flex-row">
            <ProfileContainer 
                name = "Simon Gabriel G."
                location = "Manila"
                joined="December 2025"
                isIdentityVerified={true}
                isEmailVerified={false}
                isPhoneVerified={false}/>

            <div className="w-full flex flex-col mr-10">
                <PreviouslyBooked />
            </div>

        </div>
      </motion.div>
    </>
  )
}

export default ProfilePage;