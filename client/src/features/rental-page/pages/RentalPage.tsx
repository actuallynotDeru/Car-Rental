import Header from "@/components/Header";
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
                    <div className = "border border-black rounded-lg p-4 mb-4 space-y-4">
                        <div className = "flex flex-col items-center space-y-2">
                            <h1 className = "text-4xl font-semibold">Categories</h1>
                            <hr className = "w-11/12"/>
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
                            <hr className = "w-11/12"/>
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
                <div className = "w-full space-y-12">
                    <div className = "flex flex-col items-center">
                        <h2 className = "text-3xl font-bold mb-2">Our Fleet</h2>
                        {/* <div className = "w-7/12 border-0 rounded-lg flex space-x-4 py-2 px-4 bg-white">
                            <Search />
                            <input type = "text" placeholder = "Search" className = "w-full" />
                        </div> */}
                        <InputGroup>
                            <InputGroupInput placeholder = "Search"/>
                            <InputGroupAddon>
                                <SearchIcon />
                            </InputGroupAddon>
                        </InputGroup>
                    </div>

                    <div className="grid grid-cols-3">
                        {/* Cards */}

                        test
                    </div>
                </div>
            </div>
        </>
    )
}

export default RentalPage;