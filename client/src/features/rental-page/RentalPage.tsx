import Header from "@/components/Header";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Calendar, SearchIcon } from "lucide-react";
import RentalCard from "./components/rental-card";

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
                    <div className = "border border-black rounded-lg p-4 mb-4 space-y-4">
                        <div className = "flex flex-col items-center space-y-2">
                            <h1 className = "text-4xl font-semibold">Categories</h1>
                            <hr className = "w-11/12 border-t-2 border-black"/>
                        </div>

                        <div className= "text-lg px-4">
                            <div className = "space-x-4">
                                <input type="checkbox" id="required" name="required"/>
                                <label>This field is required*</label>
                            </div>

                            <div className = "space-x-4">
                                <input type="checkbox" id="required" name="required"/>
                                <label>This field is required*</label> 
                            </div>

                            <div className = "space-x-4">
                                <input type="checkbox" id="required" name="required"/>
                                <label>This field is required*</label>
                            </div>

                            <div className = "space-x-4">
                                <input type="checkbox" id="required" name="required"/>
                                <label>This field is required*</label>
                            </div>

                            <div className = "space-x-4">
                                <input type="checkbox" id="required" name="required"/>
                                <label>This field is required*</label>
                            </div>

                            <div className = "space-x-4">
                                <input type="checkbox" id="required" name="required"/>
                                <label>This field is required*</label>
                            </div>
                        </div>
                    </div>

                    {/* Filters Box */}
                    <div className = "border border-black rounded-lg p-4 mb-4 space-y-4">
                        <div className = "flex flex-col items-center space-y-2">
                            <h1 className = "text-4xl font-semibold">Filters</h1>
                            <hr className = "w-11/12 border-t-2 border-black"/>
                        </div>

                        <div className= "text-lg space-y-4 px-4">
                            <div>
                                <h3 className = "text-xl font-semibold">Fuel Type</h3>
                                <div className = "space-x-4">
                                    <input type="checkbox" id="required" name="required"/>
                                    <label>Gas</label>
                                </div>

                                <div className = "space-x-4">
                                    <input type="checkbox" id="required" name="required"/>
                                    <label>Electric</label> 
                                </div>
                            </div>

                            <div>
                                <h3 className = "text-xl font-semibold">Price</h3>
                                <div className = "space-x-4">
                                    <input type="checkbox" id="required" name="required"/>
                                    <label>0-999</label>
                                </div>

                                <div className = "space-x-4">
                                    <input type="checkbox" id="required" name="required"/>
                                    <label>1000-1999</label>
                                </div>

                                <div className = "space-x-4">
                                    <input type="checkbox" id="required" name="required"/>
                                    <label>2000-2999</label>
                                </div>

                                <div className = "space-x-4">
                                    <input type="checkbox" id="required" name="required"/>
                                    <label>3000+</label>
                                </div>
                            </div>

                            <div>
                                <h3 className = "text-xl font-semibold">Transmission</h3>
                                <div className = "space-x-4">
                                    <input type="checkbox" id="required" name="required"/>
                                    <label>Manual</label>
                                </div>

                                <div className = "space-x-4">
                                    <input type="checkbox" id="required" name="required"/>
                                    <label>Automatic</label>
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