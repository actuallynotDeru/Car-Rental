import Header from "@/components/Header";
import RentalCard from "./components/rental-card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Calendar, SearchIcon } from "lucide-react";

const RentalPage = () => {
    return(
        <>
            <Header />

            {/* Hero */}
            <div className = "px-8 py-12 mb-16 flex flex-col items-center space-y-8">
                <div className = "text-5xl font-bold">
                    <p>Choose Your Perfect Rental Car</p>
                </div>

                <div className = "text-xl text-gray-500">
                    <p>Browse our ideal fleet and find the ideal vehicle for your journey</p>
                </div>

                <div className = "border border-gray-500 rounded-lg px-8 py-2">
                    <div className = "border border-gray-400 rounded-lg px-6 py-2 bg-white">
                        <div className = "flex space-x-4">
                            <Calendar />
                            <p>Sept 22 - Sept 24</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className = "flex bg-gray-100 p-8 space-x-8">
            {/* Left Side */}
                <div className = "w-1/4 flex flex-col space-y-4">

                {/* Category Box */}
                    <div className = "rounded-lg p-4 mb-4 space-y-4 bg-white shadow-lg">
                        <div className = "flex flex-col items-center space-y-2">
                            <h1 className = "text-4xl font-semibold">Categories</h1>
                            <hr className = "w-11/12 border-t-2 border-black"/>
                        </div>

                        <div className= "px-4 space-y-4">
                            <div className = "flex items-center gap-3">
                                <Checkbox className = "border-2 border-gray-700 data-[state=checked]:bg-gray-800 data-[state=checked]:border-gray-900 text-white"/>
                                <Label>This field is required*</Label>
                            </div>

                            <div className = "flex items-center gap-3">
                                <Checkbox className = "border-2 border-gray-700 data-[state=checked]:bg-gray-800 data-[state=checked]:border-gray-900 text-white"/>
                                <Label>This field is required*</Label> 
                            </div>

                            <div className = "flex items-center gap-3">
                                <Checkbox className = "border-2 border-gray-700 data-[state=checked]:bg-gray-800 data-[state=checked]:border-gray-900 text-white"/>
                                <Label>This field is required*</Label>
                            </div>

                            <div className = "flex items-center gap-3">
                                <Checkbox className = "border-2 border-gray-700 data-[state=checked]:bg-gray-800 data-[state=checked]:border-gray-900 text-white"/>
                                <Label>This field is required*</Label>
                            </div>

                            <div className = "flex items-center gap-3">
                                <Checkbox className = "border-2 border-gray-700 data-[state=checked]:bg-gray-800 data-[state=checked]:border-gray-900 text-white"/>
                                <Label>This field is required*</Label>
                            </div>

                            <div className = "flex items-center gap-3">
                                <Checkbox className = "border-2 border-gray-700 data-[state=checked]:bg-gray-800 data-[state=checked]:border-gray-900 text-white"/>
                                <Label>This field is required*</Label>
                            </div>
                        </div>
                    </div>

                    {/* Filters Box */}
                    <div className = "rounded-lg p-4 mb-4 space-y-4 bg-white shadow-lg">
                        <div className = "flex flex-col items-center space-y-2">
                            <h1 className = "text-4xl font-semibold">Filters</h1>
                            <hr className = "w-11/12 border-t-2 border-black"/>
                        </div>

                        <div className= "text-lg space-y-4 px-4">
                            <div className = "space-y-2">
                                <h3 className = "text-xl font-semibold">Fuel Type</h3>
                                <div className = "flex items-center gap-3">
                                    <Checkbox className = "border-2 border-gray-700 data-[state=checked]:bg-gray-800 data-[state=checked]:border-gray-900 text-white"/>
                                    <Label>Gas</Label>
                                </div>

                                <div className = "flex items-center gap-3">
                                    <Checkbox className = "border-2 border-gray-700 data-[state=checked]:bg-gray-800 data-[state=checked]:border-gray-900 text-white"/>
                                    <Label>Electric</Label> 
                                </div>
                            </div>

                            <div className = "space-y-2">
                                <h3 className = "text-xl font-semibold">Price</h3>
                                <div className = "flex items-center gap-3">
                                    <Checkbox className = "border-2 border-gray-700 data-[state=checked]:bg-gray-800 data-[state=checked]:border-gray-900 text-white"/>
                                    <Label>0-999</Label>
                                </div>

                                <div className = "flex items-center gap-3">
                                    <Checkbox className = "border-2 border-gray-700 data-[state=checked]:bg-gray-800 data-[state=checked]:border-gray-900 text-white"/>
                                    <Label>1000-1999</Label>
                                </div>

                                <div className = "flex items-center gap-3">
                                    <Checkbox className = "border-2 border-gray-700 data-[state=checked]:bg-gray-800 data-[state=checked]:border-gray-900 text-white"/>
                                    <Label>2000-2999</Label>
                                </div>

                                <div className = "flex items-center gap-3">
                                    <Checkbox className = "border-2 border-gray-700 data-[state=checked]:bg-gray-800 data-[state=checked]:border-gray-900 text-white"/>
                                    <Label>3000+</Label>
                                </div>
                            </div>

                            <div className = "space-y-2">
                                <h3 className = "text-xl font-semibold">Transmission</h3>
                                <div className = "flex items-center gap-3">
                                    <Checkbox className = "border-2 border-gray-700 data-[state=checked]:bg-gray-800 data-[state=checked]:border-gray-900 text-white"/>
                                    <Label>Manual</Label>
                                </div>

                                <div className = "flex items-center gap-3">
                                    <Checkbox className = "border-2 border-gray-700 data-[state=checked]:bg-gray-800 data-[state=checked]:border-gray-900 text-white"/>
                                    <Label>Automatic</Label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            {/* Right Side */}
                <div className = "w-full space-y-24">
                    <div className = "flex flex-col items-center space-y-4">
                        <h2 className = "text-3xl font-bold">Our Fleet</h2>
                        <InputGroup className = "bg-white w-10/12">
                            <InputGroupInput placeholder = "Search"/>
                            <InputGroupAddon>
                                <SearchIcon />
                            </InputGroupAddon>
                        </InputGroup>
                    </div>

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-12">
                        {/* Cards */}

                        {[...Array(5)].map(() => (
                            <RentalCard 
                                imgSrc = "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2?&bkba_opt=1&view=STUD_3QTR&size=600&model=my&options=$APBS,$IPB7,$PPSW,$SC04,$MDLY,$WY19P,$MTY46,$STY5S,$CPF0&crop=1150,647,390,180&2"
                                carName = "2024 Tesla Model"
                                rating = {4.6}
                                price = {1200}
                                seats = {5}
                                transmission = "Automatic"
                                type = "Electric"
                            />
                        ))}

                    </div>
                </div>
            </div>
        </>
    )
}

export default RentalPage;