import Header from "@/components/Header";


const MainPage = () => {
    return(
        <>
        <Header />

        {/* Hero Section */}

        <div className="flex flex-col items-center justify-center h-[70vh] bg-gray-100">
            
                <p className="h-auto w-[580px] text-center font-bold text-5xl mb-6">
                    <span>Rent </span>
                    A Car And <span>Start </span>
                    Your Journey With <span>Eehway</span>
                </p>
                <p>Explore Cebu your way. Choose from Eehway's wide range of cars and start driving.</p>
            
        </div>

        </>
    )
}



export default MainPage;
