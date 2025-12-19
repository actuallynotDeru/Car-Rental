import Header from "@/components/Header";
import DateRangeModal  from "./components/bookingcalendar"; // Ensure this path matches your file structure
import { MapPin, Users, Settings, Fuel, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { motion } from "framer-motion";
import { ProductAnimations } from "./animations/product.animations";


// API Imports
import { getCarById } from "./api/product.api";
import { getOwnerById } from "./api/owner.api";
import { getBookings } from "./api/booking.api"; 

// Type Imports
import type { Car, Owner } from "./types/product.types";
import { SERVER_BASE_URL } from "@/config/serverURL";

const ProductPage = () => {
  // 1. Get URL Parameters
  const { carId } = useParams<{ carId: string }>();

  // 2. Initialize State
  const [car, setCar] = useState<Car | null>(null);
  const [owner, setOwner] = useState<Owner | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for the User's selected dates
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  // State for dates that are ALREADY booked (to disable them)
  const [bookedRanges, setBookedRanges] = useState<DateRange[]>([]);

  // 3. Fetch Data
 useEffect(() => {
    const fetchData = async () => {
      if (!carId) return;

      try {
        setLoading(true);

        // 1. Fetch Data
        const [carData, allBookings] = await Promise.all([
            getCarById(carId),
            getBookings()
        ]);

        setCar(carData);

        // --- DEBUGGING: Check your browser console to see the real field names ---
        console.log("Raw API Bookings:", allBookings); 

        // 2. Filter Bookings for this Car
        const carBookings = allBookings.filter((b: any) => 
            (b.carId?._id === carId) || (b.carId === carId)
        );

        console.log("Bookings for this car:", carBookings);

        // 3. Convert to Date Ranges (Handling common field names)
        const ranges = carBookings.map((b: any) => {
            // Try different common names for start/end dates
            const start = b.startDate || b.pickupDate || b.from || b.dateStart;
            const end = b.endDate || b.returnDate || b.to || b.dateEnd;

            if (!start || !end) {
                console.warn("Skipping booking due to missing dates:", b);
                return null;
            }

            return {
                from: new Date(start),
                to: new Date(end)
            };
        }).filter(Boolean); // Remove any null entries
        
        console.log("Final Disabled Ranges:", ranges);
        setBookedRanges(ranges as DateRange[]);

        // 4. Fetch Owner
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
        console.error("Error loading data:", err);
        setError("Failed to load car details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [carId]);

  // 6. Loading State
  if (loading) {
    return (
      <motion.div variants={ProductAnimations.loading} initial = "hidden" animate = "visible" className="flex h-screen w-full items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </motion.div>
    );
  }

  // 7. Error State
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
      <motion.div variants={ProductAnimations.carousel} initial = "hidden" animate = "visible" className="w-full h-[480px] bg-gray-200 flex items-center justify-center overflow-hidden">
        {car.image ? (
            <img src={`${SERVER_BASE_URL}${car.image}`} alt={car.name} className="w-full h-full object-cover" />
        ) : (
            <p className="text-gray-500 text-lg">[No Image Available]</p>
        )}
      </motion.div>

      {/* Main Content Area */}
      <motion.div variants={ProductAnimations.mainContent} initial = "hidden" animate = "visible" className="bg-[#F2F2F2] py-12 flex justify-center">
        <div className="flex w-full max-w-6xl gap-10 px-6 flex-col lg:flex-row">
          
          {/* Left Column: Product Details */}
          <div className="flex-1 flex flex-col gap-8">
            {/* Title */}
            <motion.div variants={ProductAnimations.carTitle} initial = "hidden" animate = "visible">
              <h1 className="text-4xl font-semibold text-gray-900">{car.name}</h1>
            </motion.div>

            {/* Specs & Location */}
            <motion.div variants={ProductAnimations.specsRow} initial = "hidden" animate = "visible" className="flex justify-between items-center flex-wrap gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={18} />
                <p>{car.location}</p> 
              </div>
              <div className="flex flex-wrap items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <Users size={18} /> <span>{car.carDetails.seats} Seats</span>
                </div>
                <div className="flex items-center gap-2">
                  <Settings size={18} /> <span>{car.carDetails.transmission}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Fuel size={18} /> <span>{car.carDetails.fuelType}</span>
                </div>
              </div>
            </motion.div>

            {/* Owner Info */}
            <motion.div variants={ProductAnimations.hostSection} initial = "hidden" animate = "visible">
              <h2 className="text-2xl font-semibold text-gray-900">Hosted By</h2>
              <div className="flex items-center gap-4 mt-3">
                <div className="w-[70px] h-[70px] rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold text-gray-500">
                    {owner?.fullName?.charAt(0) || "U"}
                </div>
                <span className="text-lg font-medium text-gray-800">{owner?.fullName || "Unknown Owner"}</span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div variants={ProductAnimations.description} initial = "hidden" animate = "visible">
              <h2 className="text-2xl font-semibold text-gray-900">Description</h2>
              <p className="text-gray-600 leading-relaxed mt-2">
                {car.description}
              </p>
            </motion.div>
          </div>

          {/* Right Column: Sticky Rent Card */}
          <motion.div variants={ProductAnimations.bookingCard} initial = "hidden" animate = "visible" className="w-full lg:w-[320px] flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col gap-4 border border-gray-100 sticky top-4">
              
              {/* Price Header */}
              <div>
                <h2 className="text-lg font-semibold">Rental Price</h2>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-2xl font-bold text-[#1591EA]">₱{car.price.toLocaleString()}</p>
                  <span className="text-gray-500 text-xs">per day</span>
                </div>
              </div>

              {/* Date Selection Inputs (Trigger the Modal) */}
              <DateRangeModal onSearch={setDateRange} bookedDates={bookedRanges}>
                <div className="flex flex-col gap-2.5 cursor-pointer group">
                  
                  {/* Trip Start Box */}
                  <div className={`px-3 py-2.5 border rounded-lg select-none transition-colors ${dateRange?.from ? 'bg-white border-[#1591EA] text-gray-900' : 'bg-gray-50 border-gray-200 text-gray-400 group-hover:bg-gray-100'}`}>
                    <span className="block text-xs text-gray-500 mb-0.5">Trip Start</span>
                    <span className="font-medium">
                        {dateRange?.from ? format(dateRange.from, "PPP") : "Select Date"}
                    </span>
                  </div>

                  {/* Trip End Box */}
                  <div className={`px-3 py-2.5 border rounded-lg select-none transition-colors ${dateRange?.to ? 'bg-white border-[#1591EA] text-gray-900' : 'bg-gray-50 border-gray-200 text-gray-400 group-hover:bg-gray-100'}`}>
                    <span className="block text-xs text-gray-500 mb-0.5">Trip End</span>
                    <span className="font-medium">
                        {dateRange?.to ? format(dateRange.to, "PPP") : "Select Date"}
                    </span>
                  </div>

                </div>
              </DateRangeModal>

              {/* Action Button */}
              <button 
                className={`mt-2 w-full py-2.5 rounded-lg font-medium transition-all duration-200 ${
                    dateRange?.from && dateRange?.to 
                    ? 'bg-[#1591EA] text-white hover:bg-blue-700 shadow-sm' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!dateRange?.from || !dateRange?.to}
                onClick={() => console.log("Proceeding to checkout with:", dateRange)}
              >
                Rent Now
              </button>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductPage;