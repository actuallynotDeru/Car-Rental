import Header from "@/components/Header";
import ProfileContainer from "./components/profile-container";
import LastViewed from "./components/LastViewed-Container";
import PreviouslyBooked from "./components/PreviouslyBooked-Container";
import { motion } from "framer-motion";
import { ProfileAnimations } from "./animations/profile.animations";

const ProfilePage = () => {
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
                  <LastViewed />
                  <PreviouslyBooked />
              </div>

          </div>
        </motion.div>
      </>
  )
}

export default ProfilePage;