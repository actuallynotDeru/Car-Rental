import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import carImg from "../../assets/carimg.jpg"
import vector_img1 from "../../assets/vector_img1.svg"
import vector_img2 from "../../assets/vector_img2.svg"
import ReviewCard from "./components/ReviewCard.tsx"
import { Calendar, Search, CircleCheckBig, Key, User } from "lucide-react"
import { motion } from "framer-motion"
import { MainAnimations } from "./animations/main.animations.ts"

interface UserData {
  _id: string
  fullName: string
  email: string
  role: string
  status: string
}

const MainPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null)

  useEffect(() => {
      // Get user data from localStorage
      const userStr = localStorage.getItem('user')
      if (userStr) {
          try {
              const userData = JSON.parse(userStr)
              setUser(userData)
          } catch (error) {
              console.error('Error parsing user data:', error)
          }
      }
  }, [])

  const handleLogout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setUser(null)
      navigate('/')
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
              <button onClick={handleLogout} className="hover:underline">Log Out</button>
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
    <>
      <motion.div variants = {MainAnimations.hero} initial = "hidden" whileInView = "visible">
        {/* Hero Image */}
        <motion.div variants={MainAnimations.heroImage} initial = "hidden" whileInView = "visible" className="relative w-full h-screen overflow-hidden">
            <img src={carImg} alt="Car Image"
            className="w-full h-full object-cover transform scale-125" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
        </motion.div>
        

        {/*Transparent Header*/}
        <motion.div variants={MainAnimations.headerNav} initial = "hidden" whileInView = "visible" className="absolute top-0 left-0 w-full flex justify-between py-4 text-white bg-transparent z-10">
            <div className="px-8">
                <p className="text-2xl font-semibold">LOGO HERE</p>
            </div>

            <div className="px-8 space-x-6 flex self-center items-center">
                {user && (
                    <div className="flex items-center gap-2">
                        <User size={18} />
                        <span className="text-sm">{user.fullName}</span>
                    </div>
                )}
                {getRoleBasedButtons()}
            </div>
        </motion.div>

        {/*Hero Header*/}
        <motion.div variants={MainAnimations.heroText} initial = "hidden" whileInView = "visible" className="absolute inset-0 flex flex-col items-center justify-center
            pb-5">
            <p className="h-auto w-[580px] text-center font-bold text-5xl mb-6 text-white text-shadow-lg">
                <span className="text-[#1591EA]">Rent </span>
                A Car And <span className="text-[#1591EA]">Start </span>
                Your Journey With <span className="text-[#0D3B66]">Eehway</span>
            </p>
            <p className="text-2xl w-[580px] text-center ">Explore Cebu your way. 
                Choose from Eehway's wide range of cars and start driving.</p>

            {/*Date Fields*/}
          <motion.div variants={MainAnimations.searchBox} initial = "hidden" whileInView = "visible" className="flex items-center text-white align-middle gap-2.5 mt-16
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
            </motion.div>
        </motion.div>
      </motion.div>

    {/*Divider*/}
    <div className="w-auto h-[270px]"></div>

    {/* How does it work? */}
    <div className="w-auto h-[440px] bg-[#F2F2F2] flex flex-col items-center py-[25px] gap-[35px]">
        <motion.p variants={MainAnimations.sectionTitle} initial = "hidden" whileInView = "visible" className="font-semibold text-5xl">
            <span className="text-[#1591EA]">How </span>does it work?
        </motion.p>

        {/* Steps */}
        <motion.div variants={MainAnimations.stepsContainer} initial = "hidden" whileInView = "visible" className="w-[1100px] h-[250px] flex justify-between">
          <motion.div variants={MainAnimations.stepCard} initial = "hidden" whileInView = "visible" whileHover={MainAnimations.stepCardHover.hover} className="w-[250px] h-[230px] bg-[#FFFFFF] rounded-[16px] shadow-lg flex flex-col justify-center items-center">
            <Search color="#1591EA" size={60}/> <p className="text-2xl font-semibold">Browse & Select</p>
            <p className="w-[200px] text-center"> Explore our available vehicles and choose the one that fits your needs and budget.</p>
          </motion.div>
          
          <motion.div variants={MainAnimations.stepCard} initial = "hidden" whileInView = "visible" whileHover={MainAnimations.stepCardHover.hover} className="w-[250px] h-[230px] bg-[#FFFFFF] rounded-[16px] shadow-lg flex flex-col justify-center items-center">
            <Calendar color="#1591EA" size={60}/> <p className="text-2xl font-semibold text-center">Pick Your Dates</p>
            <p className="w-[200px] text-center">Select your pickup and return dates to see real-time availability.</p>
          </motion.div>
            
          <motion.div variants={MainAnimations.stepCard} initial = "hidden" whileInView = "visible" whileHover={MainAnimations.stepCardHover.hover} className="w-[250px] h-[230px] bg-[#FFFFFF] rounded-[16px] shadow-lg flex flex-col justify-center items-center">
            <CircleCheckBig color="#1591EA" size={60}/> <p className="text-2xl font-semibold">Book & Pay</p>
            <p className="w-[200px] text-center">Once your booking is confirmed, complete payment securely in just a few steps.</p>
          </motion.div>
          
          <motion.div variants={MainAnimations.stepCard} initial = "hidden" whileInView = "visible" whileHover={MainAnimations.stepCardHover.hover} className="w-[250px] h-[230px] bg-[#FFFFFF] rounded-[16px] shadow-lg flex flex-col justify-center items-center">
            <Key color="#1591EA" size={60}/> <p className="text-2xl font-semibold">Pick Up & Drive</p>
            <p className="w-[200px] text-center">Collect your car on your chosen date and enjoy a smooth, hassle-free ride.</p>
          </motion.div>
        </motion.div>
    </div>

    {/*Explore cebu your way */}
    <motion.div variants = {MainAnimations.featureSection} initial = "hidden" whileInView = "visible" className="w-auto h-[450px] bg-[#F2F2F2] flex justify-center">
        <motion.img variants={MainAnimations.featureImage} initial = "hidden" whileInView = "visible" src={vector_img1} className="w-[450px] h-[450px]" />

        <motion.div variants={MainAnimations.featureText} initial = "hidden" whileInView = "visible" className="flex flex-col justify-center px-10">
            <div className="flex flex-col h-auto w-[400px] justify-center gap-3">
                <h1 className="font-semibold text-3xl">Explore Cebu <span className="text-[#1591EA]">Your Way</span></h1>
                <p className="text-lg">Discover freedom on Cebu's road with Eehway's diverse 
                    car selection. Whether it's a weekend escape or a 
                    daily drive, we've got the ride for you.</p>
            </div>
            <button 
              onClick={() => navigate('/rental')}
              className="bg-[#1591EA] mt-5 text-white h-[35px] w-[100px] flex items-center justify-center gap-5 rounded-[8px] hover:bg-[#1280D1] transition-colors">
                Search Car
            </button>
        </motion.div>
    </motion.div>
    
    {/* Share the Drive */}
    <div className="w-auto h-[500px] pt-5 bg-[#F2F2F2] flex justify-center">

        {/* text */} 
        <motion.div variants={MainAnimations.featureText} initial = "hidden" whileInView = "visible" className="flex flex-col justify-center px-10">
            <div className="flex flex-col h-auto w-[400px] justify-center gap-3">
                <h1 className="font-semibold text-3xl"><span className="text-[#1591EA]">Share </span>The Drive</h1>
                <p className="text-lg">Discover freedom on Cebu's road with Eehway's diverse 
                    car selection. Whether it's a weekend escape or a 
                    daily drive, we've got the ride for you.</p>
            </div>
            <button 
              onClick={() => navigate('/application/form')}
              className="bg-[#1591EA] mt-5 text-white h-[35px] w-[120px] flex items-center justify-center gap-5 rounded-[8px] hover:bg-[#1280D1] transition-colors">
                List Your Car
            </button>
        </motion.div>

        <motion.img variants = {MainAnimations.featureImage} initial = "hidden" whileInView = "visible" src={vector_img2} className="w-[450px] h-[450px]" />
    </div>

    {/* Why choose Eehway */}
      <motion.div variants={MainAnimations.sectionTitle} initial = "hidden" whileInView = "visible" className="w-full h-[270px] flex flex-col justify-center items-center bg-[#F2F2F2] gap-[25px]">
        <p className="text-5xl font-semibold text-center">
            <span className="text-[#1591EA]">Why </span> choose <span className="text-[#0D3B66]">Eehway?</span>
        </p>

        <div className="flex flex-col justify-center items-center w-auto text-center gap-2.5">
            <h2 className="text-4xl font-medium">
            We prioritize reliability, safety, and comfort.
            </h2>
            <p className="w-[620px] text-[#8D8D8D]">
            At Eehway Transport, we make car rental simple, affordable, and reliable.
            Whether you're traveling for business or leisure, our well-maintained
            vehicles and smooth booking process ensure a hassle-free experience
            every time.
            </p>
        </div>
    </motion.div>

    {/* what our customers say */}
    <motion.div variants = {MainAnimations.reviewsContainer} initial = "hidden" whileInView = "visible" className="flex flex-col justify-center bg-[#F2F2F2] items-center gap-8 h-[600px]">
        <motion.p variants = {MainAnimations.sectionTitle} initial = "hidden" whileInView = "visible" className="text-5xl font-semibold text-center ">
            <span className="text-[#1591EA]">What </span>our customers say
        </motion.p>
        <div className="flex gap-7">
            <ReviewCard
                message="Booking was quick and hassle-free. The car was clean, well-maintained, and exactly what was shown on the website. I’ll definitely use this service again."
                name="Jane D."
            />
            <ReviewCard
                message="Customer support was very responsive and helpful. They answered all my questions and made sure everything went smoothly during my trip."
                name="Mark R."
            />
            <ReviewCard
                message="Great experience overall. The pickup process was simple, and the vehicle performed perfectly throughout my rental period."
                name="Alyssa C."
            />
        </div>
    </motion.div>

    <motion.div variants = {MainAnimations.footer} initial = "hidden" whileInView = "visible" className="w-auto h-[100px] bg-[#1591EA]">

    </motion.div>
    </>
  )
}

export default MainPage