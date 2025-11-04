import Header from "@/components/Header"
import { MapPin,Star,Users,Settings,Zap,Fuel } from "lucide-react"


const ProductPage = () =>{
    return (
        <>
            <Header />
            {/* Carousel Car Imgs */}
            <div className="w-auto h-[500px] bg-red-300">

            </div>

            <div className="bg-[#F2F2F2] w-auto h-[600px] flex justify-center">
                {/* Product Details */}
                <div className=" w-4xl flex flex-col">
                    {/* Product Name */}
                    <div className="h-auto flex flex-col">
                        <p className="font-semibold text-4xl">2024 Tesla Model Y</p>
                    </div>

                    {/* Location and car deets*/}
                    <div className="flex justify-between py-2">
                        <div className="flex gap-2">
                            <MapPin color="#8D8D8D" />
                            <p className="text-[#8D8D8D]"> Location, Location, Location</p>
                        </div>
                        
                        <div className="flex gap-7">
                            <div className="flex gap-2">
                                <Users color="#8D8D8D" /> <span className="text-[#8D8D8D]">5 Seats</span>
                            </div>
                            <div className="flex gap-2">
                                <Settings color="#8D8D8D" /> <span className="text-[#8D8D8D]">Automatic</span>
                            </div>
                            <div className="flex gap-2">
                                <Fuel color="#8D8D8D" /> <span className="text-[#8D8D8D]">Electric</span>
                            </div>
                            
                        </div>
                    </div>

                </div>
                {/* Rent now card */}
                <div className="w-xl h-auto">
                </div>  

            </div>
            


        </>
    )
}

export default ProductPage;