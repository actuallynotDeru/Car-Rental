import { MapPin, Check, X, ArrowLeft } from 'lucide-react'
import type React from 'react'

interface ProfileProps {
        name: string;
        location: string;
        joined: string;
        isIdentityVerified?: boolean;
        isEmailVerified?: boolean;
        isPhoneVerified?: boolean;
}


const ProfileContainer: React.FC<ProfileProps> = ({
    name, 
    location, 
    joined,
    isIdentityVerified = false,
    isEmailVerified = false,
    isPhoneVerified = false
}) => {
    return(
        <>
        <div className="w-[550px] h-[550px] flex flex-col items-center pt-10 pl-25 relative ">

        {/* Back button */}
        <button 
            className="flex items-center gap-1 mb-4 mx-auto text-blue-600 px-2 py-1"
            onClick={() => window.history.back()}
        >
            <ArrowLeft size={18} />
            Back
        </button>

        <div className="text-center">
            
            {/* profile deets */}
            <div>
                <p className="text-2xl font-bold">My Profile</p>
                <div className="w-32 h-32 rounded-full bg-gray-300 mb-4 mt-3 ml-4"></div>

                <p className="font-bold">{name}</p>
                <div className="flex flex-row gap-2 justify-center">
                    <MapPin />
                    <p className='font-bold'>{location}</p>
                </div>
                <p>Joined {joined}</p>
            </div>
        </div>

        {/* Verified Information */}
        <div className="mt-8">
            <p className="text-gray-600 font-semibold mb-3">VERIFIED INFORMATION</p>

            <div className="flex items-center gap-3 mb-2">
                {isIdentityVerified ? <Check className="text-green-600" /> : <X className="text-red-600" />}
                <p className="text-[#8D8D8D]">Identity</p>
                {!isIdentityVerified && <button className="text-blue-600 ml-2">Verify</button>}
            </div>

            <div className="flex items-center gap-3 mb-2">
                {isEmailVerified ? <Check className="text-green-600" /> : <X className="text-red-600" />}
                <p className="text-[#8D8D8D]">Email Address</p>
                {!isEmailVerified && <button className="text-blue-600 ml-2">Verify</button>}
            </div>

            <div className="flex items-center gap-3">
                {isPhoneVerified ? <Check className="text-green-600" /> : <X className="text-red-600" />}
                <p className="text-[#8D8D8D]">Phone Number</p>
                {!isPhoneVerified && <button className="text-blue-600 ml-2">Verify</button>}
            </div>

        <button 
        className="mt-10 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Customize Profile 
        </button> {/* add link to this button */}

        </div>

    </div>


        </>
    )
}

export default ProfileContainer