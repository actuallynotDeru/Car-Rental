import Header from "@/components/Header"
import FeatureCard from "./components/FeatureCard"
import CarRules from "./components/CarRulesCard"
import { MapPin,Star,Users,Settings,Zap,Fuel } from "lucide-react"


const ProductPage = () =>{
    return (
        <>
            <Header />
            {/* Carousel Car Imgs */}
            <div className="w-auto h-[500px] bg-red-300">

            </div>

            <div className="bg-[#F2F2F2] w-auto h-auto flex justify-center">
                {/* Product Details */}
                <div className=" w-4xl flex flex-col gap-2.5">
                    {/* Product Name */}
                    <div className="h-auto flex flex-col">
                        <p className="font-medium text-4xl">2024 Tesla Model Y</p>
                    </div>

                    {/* Location and car deets*/}
                    <div className="flex justify-between">
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

                    {/* Hosted By */}
                    <div className="flex flex-col">
                        <p className="text-3xl font-medium">Hosted By</p>
                        <div className="flex items-center py-2">
                            {/* picture and name */}
                            <div className="w-[75px] h-[75px] rounded-full bg-gray-300" />
                            <span className="m-3 text-[16px] font-medium">Machacon, Jian Bryce</span>
                        </div>
                    </div>

                    {/*Description */}
                    <div className="flex flex-col w-auto h-auto gap-2">
                        <p className="text-3xl font-medium">Description</p>
                        <p className="text-[#8D8D8D]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora voluptatibus itaque enim provident, eum architecto adipisci impedit dolorum, corporis deserunt voluptatum nemo ab cum perferendis vel soluta amet magnam natus.</p>
                    </div>

                    {/* Features */}
                    <div className="flex flex-col w-auto h-auto gap-2">
                        <p className="text-3xl font-medium">Features</p>
                        <div className="flex flex-wrap w-auto h-auto gap-1">
                            <FeatureCard />
                            <FeatureCard />
                            <FeatureCard />
                            <FeatureCard />
                            <FeatureCard />
                        </div>
                    </div>
                    {/* Car Rules */}
                    <div className="flex flex-col w-auto h-auto gap-2">
                        <p className="text-3xl font-medium">Car Rules</p>
                        <div className="flex flex-wrap w-[300px] h-auto gap-4">
                            <CarRules />
                            <CarRules />
                            <CarRules />
                            <CarRules />
                            <CarRules />
                            <CarRules />
                        </div>
                    </div>


                </div>
                {/* Rent now card */}
                <div className="bg-red-400 w-xs h-auto">
                </div>  

            </div>
            


        </>
    )
}

export default ProductPage;