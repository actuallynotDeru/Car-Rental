
import carImg from "../../assets/carimg.jpg"
import vector_img1 from "../../assets/vector_img1.svg"
import vector_img2 from "../../assets/vector_img2.svg"
import { Calendar, Search, CircleCheckBig, Key } from "lucide-react"
const MainPage = () => {
    return(
        <>
        {/* Hero Image */}
        <div className="relative w-full h-screen overflow-hidden">
            <img src={carImg} alt="Car Image"
            className="w-full h-full object-cover transform scale-125" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
        </div>
        

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
                    <p className="px-2">End Date</p>
                </div>
                <button className="bg-[#1591EA] h-[50px] w-[200px] flex items-center justify-center gap-5
                rounded-[8px]">
                    <Search />Search Car
                </button>
            </div>
        </div>

        {/*Divider*/}
        <div className="w-auto h-[270px]"></div>



        {/* How does it work? */}
        <div className="w-auto h-[440px] bg-[#F2F2F2] flex flex-col items-center py-[25px]
                        gap-[35px]">
            <p className="font-semibold text-5xl">
                <span className="text-[#1591EA]">How </span>does it work?
            </p>

            {/* Steps */}
            <div className="w-[1100px] h-[250px] flex justify-between">
                <div className="w-[250px] h-[230px] bg-[#FFFFFF] rounded-[16px] shadow-lg flex
                                flex-col justify-center items-center">
                <Search color="#1591EA" size={60}/> <p className="text-2xl font-semibold">Browse & Select</p>
                <p className="w-[200px] text-center"> Lorem Ipsum DOLOR LALALALALALLALALALAL</p>
                </div>
                <div className="w-[250px] h-[230px] bg-[#FFFFFF] rounded-[16px] shadow-lg flex
                                flex-col justify-center items-center">
                <Calendar color="#1591EA" size={60}/> <p className="text-2xl font-semibold">Pick Your Dates</p>
                <p className="w-[200px] text-center"> Lorem Ipsum DOLOR LALALALALALLALALALAL</p>
                </div>
                <div className="w-[250px] h-[230px] bg-[#FFFFFF] rounded-[16px] shadow-lg flex
                                flex-col justify-center items-center">
                <CircleCheckBig color="#1591EA" size={60}/> <p className="text-2xl font-semibold">Book & Pay</p>
                <p className="w-[200px] text-center"> Lorem Ipsum DOLOR LALALALALALLALALALAL</p>
                </div>
                <div className="w-[250px] h-[230px] bg-[#FFFFFF] rounded-[16px] shadow-lg flex
                                flex-col justify-center items-center">
                <Key color="#1591EA" size={60}/> <p className="text-2xl font-semibold">Book & Pay</p>
                <p className="w-[200px] text-center"> Lorem Ipsum DOLOR LALALALALALLALALALAL</p>
                </div>
            </div>
        </div>

        {/*Explore cebu your way */}
        <div className="w-auto h-[450px] bg-[#F2F2F2] flex justify-center">
            <img src={vector_img1} className="w-[450px] h-[450px]" ></img>

            <div className="flex flex-col justify-center px-10">
                <div className="flex flex-col h-auto w-[400px] justify-center gap-3">
                    <h1 className="font-semibold text-3xl">Explore Cebu <span className="text-[#1591EA]">Your Way</span></h1>
                    <p className="text-lg">Discover freedom on Cebu’s road with Eehway’s diverse 
                        car selection. Whether it’s a weekend escape or a 
                        daily drive, we’ve got the ride for you.</p>
                </div>
                <button className="bg-[#1591EA] mt-5 text-white h-[35px] w-[100px] flex items-center justify-center gap-5
                rounded-[8px]">
                    Search Car
                </button>
            </div>
        </div>
        {/* Share the Drive */}
        
        <div className="w-auto h-[500px] pt-5 bg-[#F2F2F2] flex justify-center">

            {/* text */} 
            <div className="flex flex-col justify-center px-10">
                <div className="flex flex-col h-auto w-[400px] justify-center gap-3">
                    <h1 className="font-semibold text-3xl"><span className="text-[#1591EA]">Share </span>The Drive</h1>
                    <p className="text-lg">Discover freedom on Cebu’s road with Eehway’s diverse 
                        car selection. Whether it’s a weekend escape or a 
                        daily drive, we’ve got the ride for you.</p>
                </div>
                <button className="bg-[#1591EA] mt-5 text-white h-[35px] w-[120px] flex items-center justify-center gap-5
                rounded-[8px]">
                    List Your Car
                </button>
            </div>

            <img src={vector_img2} className="w-[450px] h-[450px]"></img>
        </div>

        


        </>
    )
}



export default MainPage;
