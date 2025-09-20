import { faker } from "@faker-js/faker";
import { connectIfNeeded, disconnectIf, pick, randomInt } from "./helpers.js";
import Booking from "../models/Bookings.js";
import Car from "../models/Cars.js";
import User from "../models/User.js";
import { pathToFileURL } from "url";

const BOOKINGS_COUNT = 20;

function makeBooking(car, customer) {
  const start = faker.date.soon({ days: 30 });
  const durationDays = randomInt(1, 7);
  const end = new Date(start.getTime() + durationDays * 24 * 60 * 60 * 1000);
  const status = pick(["Pending", "Confirmed", "Cancelled", "Completed"]);
  const totalPrice = durationDays * (car.price || 0);

  return {
    ownerId: car.ownerId,
    customerId: customer?._id || null,
    carId: car._id,
    pickupDate: start,
    returnDate: end,
    pickupLocation: `${car.location?.city || "City"}, ${car.location?.province || "Province"}`,
    totalPrice,
    paymentProof: status === "Confirmed" || status === "Completed" ? faker.image.url() : null,
    status,
  };
}

export async function seedBookings({ clear = true, cars = null, customers = null } = {}) {
  const didConnect = await connectIfNeeded();
  try {
    if (!cars) cars = await Car.find({});
    if (!customers) customers = await User.find({ role: "Customer" });
    if (!cars.length || !customers.length) throw new Error("Need cars and customers to create bookings.");

    if (clear) await Booking.deleteMany({});

    const bookings = [];
    for (let i = 0; i < BOOKINGS_COUNT; i++) {
      const car = pick(cars);
      const customer = pick(customers);
      bookings.push(makeBooking(car, customer));
    }

    const inserted = await Booking.insertMany(bookings, { ordered: true });
    console.log(`🧾 Inserted bookings: ${inserted.length}`);
    return inserted;
  } finally {
    await disconnectIf(didConnect);
  }
}

async function main() {
  await seedBookings({ clear: true });
}
const isDirect = pathToFileURL(process.argv[1]).href === import.meta.url;
if (isDirect) main().catch(e => { console.error(e); process.exit(1); });