import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import FeatureCard from "./components/FeatureCard";
import CarRules from "./components/CarRulesCard";
import CustomerReview from "./components/CustomerReview";
import { MapPin, Star, Users, Settings, Fuel, MoveLeft, MoveRight, Hash } from "lucide-react";
import { getCarById } from "./api/product.api";
import type { Car } from "./types/product.types";
import { API_BASE_URL } from "@/config/apiURL";

const ProductPage = () => {
  const { carId } = useParams<{ carId: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCar = async () => {
      if (!carId) {
        setError("No car ID provided");
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        console.log("Fetching car with ID:", carId);
        const data = await getCarById(carId);
        setCar(data);
        setError(null);
      } catch (err: any) {
        console.error("Full error:", err);
        setError(`Failed to load car details: ${err.response?.status}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [carId]);
  
  if(loading) {
    return (
      <>
        <Header />
        <div className = "flex items-center justify-center h-screen">
          <p className = "text-xl text-gray-600">Loading...</p>
        </div>
      </>
    )
  }
  
  if(error || !car) {
    return(
      <>
        <Header />
        <div className = "flex items-center justify-center h-screen">
          <p className = "text-xl text-red-600">{ error || "Car not found" }</p>
        </div>
      </>
    )
  }
  
  const {
    name,
    price,
    carDetails: { seats, transmission, fuelType, plateNumber },
    rating,
    image,
    status,
    ownerId: {fullName}
  } = car;
  
  return (
    <>
      <Header />

      {/* Hero Image (from schema.image) */}
      <div
        className="w-full h-[480px] bg-gray-200 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        {!image && <p className="text-gray-500 text-lg">[Car Images Carousel]</p>}
      </div>

      {/* Main Content */}
      <div className="bg-[#F2F2F2] py-12 flex justify-center">
        <div className="flex w-full max-w-6xl gap-10 px-6">
          {/* Left: Product Details */}
          <div className="flex-1 flex flex-col gap-8">
            {/* Car Name + Status */}
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-semibold text-gray-900">{name}</h1>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  status === "Available"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {status}
              </span>
            </div>

            {/* Location & Car Details */}
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={18} />
                <p>Location, Location, Location</p>
              </div>
              <div className="flex flex-wrap items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <Users size={18} /> <span>{seats} Seats</span>
                </div>
                <div className="flex items-center gap-2">
                  <Settings size={18} /> <span>{transmission}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Fuel size={18} /> <span>{fuelType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Hash size={18} /> <span>{plateNumber}</span>
                </div>
              </div>
            </div>

            {/* Hosted By */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Hosted By</h2>
              <div className="flex items-center gap-4 mt-3">
                <div className="w-[70px] h-[70px] rounded-full bg-gray-300" />
                <span className="text-lg font-medium text-gray-800">
                  Owner ID: {car.ownerId.fullName}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Description</h2>
              <p className="text-gray-600 leading-relaxed mt-2">
                {/* Replace with actual car description when available */}
                Detailed description goes here.
              </p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Features</h2>
              <div className="flex flex-wrap gap-2">
                <FeatureCard />
                <FeatureCard />
                <FeatureCard />
              </div>
            </div>

            {/* Car Rules */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Car Rules</h2>
              <div className="flex flex-wrap gap-4 max-w-md">
                <CarRules />
                <CarRules />
                <CarRules />
              </div>
            </div>
          </div>

          {/* Right: Rent Now Card */}
          <div className="w-[280px] flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col gap-4 border border-gray-100">
              <div>
                <h2 className="text-lg font-semibold">Rental Price</h2>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-2xl font-bold text-[#1591EA]">
                    ₱{price.toLocaleString()}
                  </p>
                  <span className="text-gray-500 text-xs">per day</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-lg font-medium text-gray-800">{rating.toFixed(1)}</p>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < Math.round(rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              <div className="flex flex-col gap-2.5">
                <div className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-400 select-none cursor-default">
                  Trip Start
                </div>
                <div className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-400 select-none cursor-default">
                  Trip End
                </div>
                <div className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-400 select-none cursor-default">
                  Select Delivery Method
                </div>
              </div>

              <button className="mt-2 w-full bg-[#1591EA] text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews (static placeholder) */}
      <div className="bg-[#F2F2F2] py-12 flex justify-center">
        <div className="w-full max-w-6xl px-6 flex flex-col gap-8">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <p className="font-semibold text-3xl text-gray-900">Reviews (999)</p>
            <div className="flex items-center gap-2">
              <p className="text-lg font-medium text-gray-800">{rating.toFixed(1)}</p>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={
                    i < Math.round(rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }
                  size={22}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <CustomerReview />
            <CustomerReview />
            <CustomerReview />
          </div>

          <div className="flex justify-center items-center gap-3 mt-6">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100">
              <MoveLeft size={16} />
            </button>
            <div className="flex items-center gap-2">
              <button className="px-3 py-2 bg-amber-500 text-white rounded-lg">1</button>
              <button className="px-3 py-2 bg-white border border-gray-300 text-gray-600 hover:bg-gray-100">
                2
              </button>
              <button className="px-3 py-2 bg-white border border-gray-300 text-gray-600 hover:bg-gray-100">
                3
              </button>
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