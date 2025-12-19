import React from 'react';
import RentalCard from "./rental-card";
import type { BookingWithDetails } from "../types/profile.types";
import { SERVER_BASE_URL } from "@/config/serverURL";

interface PreviouslyBookedProps {
    bookings: BookingWithDetails[];
}

const PreviouslyBooked: React.FC<PreviouslyBookedProps> = ({ bookings }) => {
    // Filter only completed or confirmed bookings for "previously booked"
    const previousBookings = bookings.filter(
        (booking) => booking.status === "Completed" || booking.status === "Confirmed"
    );

    return (
        <section className="py-10 max-w-7xl mx-auto">
            {/* Section Title */}
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Previously Booked
            </h2>

            {/* Grid Layout */}
            {previousBookings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                    {previousBookings.map((booking) => {
                        const car = booking.carId;
                        
                        // Skip if car data is not populated
                        if (!car || typeof car === 'string') return null;

                        const imageUrl = car.image 
                            ? `${SERVER_BASE_URL}${car.image}` 
                            : "https://via.placeholder.com/300x200?text=No+Image";

                        return (
                            <RentalCard 
                                key={booking._id}
                                imgSrc={imageUrl}
                                imgAlt={car.name}
                                carName={car.name}
                                rating={car.rating || 4.5}
                                price={car.price}
                                seats={car.carDetails?.seats || 4}
                                transmission={car.carDetails?.transmission || "Automatic"}
                                type={car.carDetails?.fuelType || "Gasoline"}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-10">
                    <p className="text-gray-500 text-lg">No previous bookings found.</p>
                    <p className="text-gray-400 text-sm mt-2">
                        Your completed rentals will appear here.
                    </p>
                </div>
            )}
        </section>
    );
}

export default PreviouslyBooked;