import { Star, Users, Settings, Zap } from "lucide-react";

interface RentalCardProps {
    imgSrc: string;
    imgAlt?: string;
    carName: string;
    rating: number;
    price: number;
    seats: number;
    transmission: string;
    type: string;
}

const RentalCard = ({imgSrc, imgAlt, carName, rating, price, seats, transmission, type} : RentalCardProps) => {
    return(
        <div className="max-w-md bg-white rounded-2xl overflow-hidden p-4 text-center shadow-2xl">
                <img
                    src= {imgSrc}
                    alt= {imgAlt}
                    className="w-full h-40 object-contain mb-3"
                />

                <h2 className="text-3xl font-semibold">{carName}</h2>

                {/* Rating */}
                <div className="flex justify-between mt-1 gap-1">
                    <div className= "flex items-center">
                        {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={16}
                            className={`${
                            i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                        />
                        ))}
                        <span className="ml-1 text-sm">{rating}</span>
                    </div>
                    
                    {/* Price */}
                    <p className="font-medium mt-1">₱{price}/day</p>
                </div>

                {/* Details */}
                <div className="flex items-center justify-between gap-4 text-xs text-gray-400 my-3">
                    <div className="flex items-center gap-1">
                        <Users size={16} /> <span>{seats} seats</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <Settings size={16} /> <span>{transmission}</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <Zap size={16} /> <span>{type}</span>
                    </div>
                </div>

                {/* Button */}
                <div className = "w-full mb-2">
                    <button className="mt-5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded-lg shadow w-full">
                        Rent Now
                    </button>
                </div>
        </div>
    )
}

export default RentalCard;