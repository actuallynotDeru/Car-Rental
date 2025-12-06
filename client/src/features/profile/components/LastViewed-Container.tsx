import React from 'react';
import RentalCard from "./rental-card";

// 1. Create some mock data to replicate the screenshot
const recentCars = [
  {
    id: 1,
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_Model_3_at_Geneva_International_Motor_Show_2018_03.jpg", // Replace with your actual image path
    imgAlt: "Red Tesla Model Y",
    carName: "2024 Tesla Model Y",
    rating: 4.6,
    price: 1200,
    seats: 5,
    transmission: "Automatic",
    type: "Electric",
  },
  {
    id: 2,
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_Model_3_at_Geneva_International_Motor_Show_2018_03.jpg",
    imgAlt: "Red Tesla Model Y",
    carName: "2024 Tesla Model Y",
    rating: 4.6,
    price: 1200,
    seats: 5,
    transmission: "Automatic",
    type: "Electric",
  },
  {
    id: 3,
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_Model_3_at_Geneva_International_Motor_Show_2018_03.jpg",
    imgAlt: "Red Tesla Model Y",
    carName: "2024 Tesla Model Y",
    rating: 4.6,
    price: 1200,
    seats: 5,
    transmission: "Automatic",
    type: "Electric",
  },
];

const LastViewed = () => {
    return (
        <section className="py-10 max-w-7xl mx-auto">
            {/* Section Title */}
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Recently Viewed
            </h2>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                {recentCars.map((car) => (
                    <RentalCard 
                        key={car.id}
                        imgSrc={car.imgSrc}
                        imgAlt={car.imgAlt}
                        carName={car.carName}
                        rating={car.rating}
                        price={car.price}
                        seats={car.seats}
                        transmission={car.transmission}
                        type={car.type}
                    />
                ))}
            </div>
        </section>
    );
}

export default LastViewed;