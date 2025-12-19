import type React from 'react'
import { useNavigate } from 'react-router-dom';
import { MapPin, Check, X, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion';
import { ProfileAnimations } from '../animations/profile.animations';
import { Button } from '@/components/ui/button';
import { SERVER_BASE_URL } from '@/config/serverURL';

interface ProfileProps {
        name: string;
        location: string;
        joined: string;
        isIdentityVerified?: boolean;
        isEmailVerified?: boolean;
        isPhoneVerified?: boolean;
        selfiePhoto?: string | null;
}

const MotionButton = motion.create(Button);

const ProfileContainer: React.FC<ProfileProps> = ({
    name, 
    location, 
    joined,
    isIdentityVerified = false,
    isEmailVerified = false,
    isPhoneVerified = false,
    selfiePhoto = null
}) => {
  const navigate = useNavigate();

  const profileImageUrl = selfiePhoto 
    ? `${SERVER_BASE_URL}${selfiePhoto}` 
    : null;
  
    return(
      <>
        <motion.div variants={ProfileAnimations.profileContainer} initial = "hidden" animate = "visible">
          <div className="w-[550px] h-[550px] flex flex-col items-center pt-10 pl-25 relative ">
  
          {/* Back button */}
          <Button 
            variant = "outline"
            onClick={() => navigate("/")}
            className = "bg-blue-600 text-white hover:bg-blue-700 hover:text-white mb-4 cursor-pointer"
          >
              <ArrowLeft size={18} />
              Back
          </Button>
  
          <div className="text-center">
            
            {/* profile deets */}
            <motion.div variants = {ProfileAnimations.profileDetails} initial = "hidden" animate = "visible">
                <p className="text-2xl font-bold">My Profile</p>
                {profileImageUrl ? (
                  <img 
                    src={profileImageUrl} 
                    alt="Profile" 
                    className="w-32 h-32 rounded-full object-cover mb-4 mt-3 ml-4"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-300 mb-4 mt-3 ml-4 flex items-center justify-center">
                    <span className="text-gray-500 text-4xl font-bold">
                      {name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </div>
                )}

                <p className="font-bold">{name}</p>
                <div className="flex flex-row gap-2 justify-center">
                    <MapPin />
                    <p className='font-bold'>{location}</p>
                </div>
                <p>Joined {joined}</p>
            </motion.div>
          </div>
  
          {/* Verified Information */}
            <motion.div variants={ProfileAnimations.verificationSection} initial = "hidden" animate = "visible" className="mt-8">
              <motion.p variants={ProfileAnimations.verificationItems} initial = "hidden" animate = "visible" className="text-gray-600 font-semibold mb-3">VERIFIED INFORMATION</motion.p>
  
              <motion.div variants={ProfileAnimations.verificationItem} initial = "hidden" animate = "visible" className="flex items-center gap-3 mb-2">
                  {isIdentityVerified ? <Check className="text-green-600" /> : <X className="text-red-600" />}
                  <p className="text-[#8D8D8D]">Identity</p>
                  {!isIdentityVerified && <button className="text-blue-600 ml-2">Verify</button>}
              </motion.div>
  
              <motion.div variants={ProfileAnimations.verificationItems} initial = "hidden" animate = "visible" className="flex items-center gap-3 mb-2">
                  {isEmailVerified ? <Check className="text-green-600" /> : <X className="text-red-600" />}
                  <p className="text-[#8D8D8D]">Email Address</p>
                  {!isEmailVerified && <button className="text-blue-600 ml-2">Verify</button>}
              </motion.div>
  
              <motion.div variants={ProfileAnimations.verificationItems} initial = "hidden" animate = "visible" className="flex items-center gap-3">
                  {isPhoneVerified ? <Check className="text-green-600" /> : <X className="text-red-600" />}
                  <p className="text-[#8D8D8D]">Phone Number</p>
                  {!isPhoneVerified && <button className="text-blue-600 ml-2">Verify</button>}
              </motion.div>
    
              <MotionButton variants={ProfileAnimations.customizeButton} initial = "rest" whileHover = {ProfileAnimations.customizeButton.hover} variant = "outline" className = "bg-blue-600 text-white hover:bg-blue-700 hover:text-white cursor-pointer mt-4">
                Customize Profile 
              </MotionButton> {/* add link to this button */}
    
            </motion.div>
          </div>
        </motion.div>
      </>
    )
}

export default ProfileContainer