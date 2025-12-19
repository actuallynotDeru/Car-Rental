import Header from "@/components/Header";
import CustomerReview from "./components/CustomerReview";
import DateRangeModal  from "./components/bookingcalendar"; // Ensure this path matches your file structure
import { MapPin, Star, Users, Settings, Fuel, MoveLeft, MoveRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { motion } from "framer-motion";
import { ProductAnimations } from "./animations/product.animations";


// API Imports
import { getCarById, rateCar } from "./api/product.api";
import { getOwnerById } from "./api/owner.api";
import { getBookings } from "./api/booking.api"; 

// Type Imports
import type { Car, Owner } from "./types/product.types";
import { SERVER_BASE_URL } from "@/config/serverURL";

const ProductPage = () => {
  const { carId } = useParams<{ carId: string }>();
  const navigate = useNavigate(); 

  // State
  const [car, setCar] = useState<Car | null>(null);
  const [owner, setOwner] = useState<Owner | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [bookedRanges, setBookedRanges] = useState<DateRange[]>([]);
  // State for user rating
  const [userRating, setUserRating] = useState<number>(0);
  const [isRating, setIsRating] = useState<boolean>(false);
  const [ratingMessage, setRatingMessage] = useState<string>("");

  // Handle rating submission
  const handleRate = async (rating: number) => {
    if (!carId || isRating) return;
    
    setIsRating(true);
    setRatingMessage("");
    
    try {
      const updatedCar = await rateCar(carId, rating);
      setCar(updatedCar);
      setUserRating(rating);
      setRatingMessage("Thanks for rating!");
      
      // Clear message after 3 seconds
      setTimeout(() => setRatingMessage(""), 3000);
    } catch (err) {
      console.error("Error rating car:", err);
      setRatingMessage("Failed to submit rating");
    } finally {
      setIsRating(false);
    }
  };

  // Helper: Calculate Price
  const calculateTotal = (from: Date, to: Date, pricePerDay: number) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((to.getTime() - from.getTime()) / oneDay)) + 1;
    return diffDays * pricePerDay;
  };

  // Helper: Calculate Days Count
  const calculateDays = (from: Date, to: Date) => {
    return Math.round((to.getTime() - from.getTime()) / (1000 * 3600 * 24)) + 1;
  };

  // Handle "Rent Now" Click
  const handleRentClick = () => {
    if (!car || !dateRange?.from || !dateRange?.to) return;

    const days = calculateDays(dateRange.from, dateRange.to);
    const totalPrice = calculateTotal(dateRange.from, dateRange.to, car.price);

    // Redirect to Payment Page with Data
    navigate("/payment", {
      state: {
        // --- ADDED: IDs needed for the API Payload ---
        carId: car._id,
        // Handle case where ownerId might be populated object or just a string ID
        ownerId: typeof car.ownerId === 'object' ? car.ownerId._id : car.ownerId, 
        // ---------------------------------------------
        
        carName: car.name,
        image: car.image,
        pricePerDay: car.price,
        startDate: dateRange.from,
        endDate: dateRange.to,
        totalDays: days,
        totalPrice: totalPrice,
        serviceFee: 500, 
        tax: totalPrice * 0.12, 
      }
    });
  };

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      if (!carId) return;

      try {
        setLoading(true);

        const [carData, allBookings] = await Promise.all([
            getCarById(carId),
            getBookings()
        ]);

        setCar(carData);

        // Filter Bookings for this Car
        const carBookings = allBookings.filter((b: any) => 
            (b.carId?._id === carId) || (b.carId === carId)
        );

        // Convert to Date Ranges
        const ranges = carBookings.map((b: any) => {
            const start = b.startDate || b.pickupDate || b.from;
            const end = b.endDate || b.returnDate || b.to;
            if (!start || !end) return null;
            return { from: new Date(start), to: new Date(end) };
        }).filter(Boolean);
        
        setBookedRanges(ranges as DateRange[]);

        // Fetch Owner
        if (carData?.ownerId) {
          const ownerIdToFetch = carData.ownerId._id || carData.ownerId;
          if (typeof ownerIdToFetch === 'string') {
              const ownerRes = await getOwnerById(ownerIdToFetch);
              setOwner(ownerRes);
          } else {
              setOwner(carData.ownerId);
          }
        }

      } catch (err) {
        console.error("Error loading product page:", err);
        setError("Failed to load car details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [carId]);

  if (loading) {
    return (
      <motion.div variants={ProductAnimations.loading} initial = "hidden" animate = "visible" className="flex h-screen w-full items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </motion.div>
    );
  }

  if (error || !car) {
    return (
      <div className="flex h-screen w-full items-center justify-center text-red-500">
        {error || "Car not found"}
      </div>
    );
  }

  return (
    <motion.div variants={ProductAnimations.container} initial = "hidden" animate = "visible">
      <Header />

      {/* Hero Image / Carousel Placeholder */}
      <div className="w-full h-[480px] bg-gray-200 flex items-center justify-center overflow-hidden">
        {car.image ? (
            <img src={`${SERVER_BASE_URL}${car.image}`} alt={car.name} className="w-full h-full object-cover" />
        ) : (
            <p className="text-gray-500 text-lg">[No Image Available]</p>
        )}
      </motion.div>

      {/* Main Content Area */}
      <div className="bg-[#F2F2F2] py-12 flex justify-center">
        <div className="flex w-full max-w-6xl gap-10 px-6 flex-col lg:flex-row">
          
          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-8">
            {/* Title */}
            <div>
              <h1 className="text-4xl font-semibold text-gray-900">{car.name}</h1>
            </div>

            {/* Specs & Location */}
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={18} />
                <p>{car.location}</p> 
              </div>
              <div className="flex flex-wrap items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2"><Users size={18} /> <span>{car.carDetails.seats} Seats</span></div>
                <div className="flex items-center gap-2"><Settings size={18} /> <span>{car.carDetails.transmission}</span></div>
                <div className="flex items-center gap-2"><Fuel size={18} /> <span>{car.carDetails.fuelType}</span></div>
              </div>
            </motion.div>

            {/* Owner Info */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Hosted By</h2>
              <div className="flex items-center gap-4 mt-3">
                <div className="w-[70px] h-[70px] rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold text-gray-500">
                    {owner?.fullName?.charAt(0) || "U"}
                </div>
                <span className="text-lg font-medium text-gray-800">{owner?.fullName || "Unknown Owner"}</span>
              </div>
            </motion.div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Description</h2>
              <p className="text-gray-600 leading-relaxed mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora voluptatibus itaque enim provident, eum architecto adipisci impedit dolorum.
              </p>
            </div>
          </div>

          {/* Right Column: Sticky Rent Card */}
          <div className="w-full lg:w-[320px] flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col gap-4 border border-gray-100 sticky top-4">
              
              <div>
                <h2 className="text-lg font-semibold">Rental Price</h2>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-2xl font-bold text-[#1591EA]">₱{car.price.toLocaleString()}</p>
                  <span className="text-gray-500 text-xs">per day</span>
                </div>
              </div>

              <DateRangeModal onSearch={setDateRange} bookedDates={bookedRanges}>
                <div className="flex flex-col gap-2.5 cursor-pointer group">
                  
                  <div className={`px-3 py-2.5 border rounded-lg select-none transition-colors ${dateRange?.from ? 'bg-white border-[#1591EA] text-gray-900' : 'bg-gray-50 border-gray-200 text-gray-400 group-hover:bg-gray-100'}`}>
                    <span className="block text-xs text-gray-500 mb-0.5">Trip Start</span>
                    <span className="font-medium">
                        {dateRange?.from ? format(dateRange.from, "PPP") : "Select Date"}
                    </span>
                  </div>

                  <div className={`px-3 py-2.5 border rounded-lg select-none transition-colors ${dateRange?.to ? 'bg-white border-[#1591EA] text-gray-900' : 'bg-gray-50 border-gray-200 text-gray-400 group-hover:bg-gray-100'}`}>
                    <span className="block text-xs text-gray-500 mb-0.5">Trip End</span>
                    <span className="font-medium">
                        {dateRange?.to ? format(dateRange.to, "PPP") : "Select Date"}
                    </span>
                  </div>

                </div>
              </DateRangeModal>
              
              {/* Dynamic Price Display */}
              {dateRange?.from && dateRange?.to && (
                  <div className="mt-2 space-y-2 border-t pt-4 border-gray-100 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>₱{car.price.toLocaleString()} x {calculateDays(dateRange.from, dateRange.to)} days</span>
                      <span>₱{calculateTotal(dateRange.from, dateRange.to, car.price).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-gray-900 pt-2 border-t mt-2">
                        <span>Total (Pre-tax)</span>
                        <span>₱{calculateTotal(dateRange.from, dateRange.to, car.price).toLocaleString()}</span>
                    </div>
                  </div>
              )}

              <button 
                className={`mt-2 w-full py-2.5 rounded-lg font-medium transition-all duration-200 ${
                    dateRange?.from && dateRange?.to 
                    ? 'bg-[#1591EA] text-white hover:bg-blue-700 shadow-sm' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!dateRange?.from || !dateRange?.to}
                onClick={handleRentClick}
              >
                Rent Now
              </button>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-[#F2F2F2] py-12 flex justify-center border-t border-gray-200">
        <div className="w-full max-w-6xl px-6 flex flex-col gap-8">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <p className="font-semibold text-3xl text-gray-900">Reviews (12)</p>
            <div className="flex items-center gap-2">
              <p className="text-lg font-medium text-gray-800">{car.rating || 4.5}</p>
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="fill-yellow-400 text-yellow-400" size={22} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <CustomerReview />
            <CustomerReview />
            <CustomerReview />
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 mt-6">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100">
              <MoveLeft size={16} />
            </button>
            <div className="flex items-center gap-2">
              <button className="px-3 py-2 bg-amber-500 text-white rounded-lg">1</button>
              <button className="px-3 py-2 bg-white border border-gray-300 text-gray-600 hover:bg-gray-100">2</button>
            </div>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100">
              <MoveRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;