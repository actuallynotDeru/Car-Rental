
import carImg from "../../assets/carimg.jpg";
import { Calendar, Search } from "lucide-react"
const MainPage = () => {
    return(
        <>
        {/* Hero Image */}
        <div className="relative w-full">
            <img src={carImg} alt="Car Image"
            className="w-[1658px] h-auto scale-125" />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />

        {/*Transparent Header*/}
        <div className="absolute top-0 left-0 w-full flex justify-between py-4 text-white bg-transparent">
            <div className="px-8">
                <p className="text-2xl font-semibold">LOGO HERE</p>
            </div>

            <div className="px-8 space-x-8 flex self-center">
                <p>Rent</p>
                <p>About</p>
                <p>List Your Car</p>
            </div>

            <div className="px-8 space-x-8 flex self-center">
                <p>Sign Up</p>
                <p>Log In</p>
            </div>
        </div>

        {/*Hero Header*/}
        <div className="absolute inset-0 flex flex-col items-center justify-center
            pb-5">
            <p className="h-auto w-[580px] text-center font-bold text-5xl mb-6 text-white text-shadow-lg">
                <span className="text-[#1591EA]">Rent </span>
                A Car And <span className="text-[#1591EA]">Start </span>
                Your Journey With <span className="text-[#0D3B66]">Eehway</span>
            </p>
            <p className="text-2xl w-[580px] text-center ">Explore Cebu your way. 
                Choose from Eehway's wide range of cars and start driving.</p>

            {/*Date Fields*/}
            <div className="flex items-center text-white align-middle gap-2.5 mt-16
            w-[650px] h-[75px] border-1 border-white bg-[#2D3748]/40 rounded-2xl px-5">
                <div className="flex items-center w-[200px] h-[50px]">
                    <Calendar color="#1591EA" size={36}/>
                    <p className="px-2">Start Date</p>
                </div>
                <div className="flex items-center w-[200px] h-[50px] border-l px-2.5">
                    <Calendar color="#1591EA" size={36}/>
                    <p className="px-2 text-">End Date</p>
                </div>
                <button className="bg-[#1591EA] h-[50px] w-[200px] flex items-center justify-center gap-5
                rounded-[8px]">
                    <Search />Search Car
                </button>
            </div>
        </div>

        {/*Divider*/}
        <div className="w-auto h-[270px]"></div>
        


        </>
    )
}



export default MainPage;
