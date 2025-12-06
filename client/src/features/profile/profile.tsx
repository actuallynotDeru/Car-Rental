import Header from "@/components/Header";
import ProfileContainer from "./components/profile-container";
import LastViewed from "./components/LastViewed-Container";
import PreviouslyBooked from "./components/PreviouslyBooked-Container";

const ProfilePage = () => {
    return(
        <>
            <Header />

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



        </>
    )
}

export default ProfilePage;