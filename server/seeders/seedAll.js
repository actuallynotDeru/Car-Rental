import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Car from "../models/Cars.js";
import Booking from "../models/Bookings.js";
import CarOwnerApplication from "../models/CarOwnerApplication.js";
import { seedUsers } from "./users.seeders.js";
import { seedCars } from "./cars.seeders.js";
import { seedBookings } from "./bookings.seeder.js";
import { seedCarOwnerApplications } from "./carOwnerApplications.seeder.js";

dotenv.config();

async function main() {
    const MONGOURL = process.env.ATLAS_URI;
    if(!MONGOURL) throw new Error("ATLAS_URI is missing in environment");
    await mongoose.connect(MONGOURL);
    console.log("Connected to MongoDB");

    try {
        await Promise.all([
            Booking.deleteMany({}),
            Car.deleteMany({}),
            User.deleteMany({}),
            CarOwnerApplication.deleteMany({}),
        ]);
        console.log("Cleared collections: users, cars, bookings");

        const users = await seedUsers({ clear: false });
        const owners = users.filter(u => u.role === "CarOwner");
        const customers = users.filter(u => u.role === "Customer");
        const cars = await seedCars({ clear: false, owners });
        await seedBookings({ clear: false, cars, customers });
        await seedCarOwnerApplications({ clear: false, customers});

        console.log("Seeding completed");
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected");
    }
}

main().catch(e => { console.error("Seeding failed:", e); process.exit(1); });