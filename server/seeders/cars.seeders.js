import { faker } from "@faker-js/faker";
import { connectIfNeeded, disconnectIf, pick, randomInt } from "./helpers.js";
import Car from "../models/Cars.js";
import User from "../models/User.js";
import { pathToFileURL } from "url";

const CARS_PER_OWNER_MIN = 1;
const CARS_PER_OWNER_MAX = 4;

function makePlate() {
  return `${faker.string.alpha({ length: 3, casing: "upper" })}-${randomInt(1000, 9999)}`;
}

function makeCar(owner, plate) {
  return {
    ownerId: owner._id,
    name: `${pick(["Toyota","Honda","Ford","Chevrolet","Nissan","Hyundai","Kia","BMW","Audi","Mercedes"])} ${pick(["Sedan","Hatchback","SUV","Pickup","Coupe","Van"])}`,
    price: randomInt(1200, 6000),
    location: { city: owner.city || faker.location.city(), province: owner.province || faker.location.state() },
    carDetails: {
      modelYear: randomInt(2008, 2024),
      plateNumber: plate,
      mileage: randomInt(1000, 180000),
    },
    rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
    seats: randomInt(2, 8),
    transmission: pick(["Automatic", "Manual"]),
    fuelType: pick(["Gasoline", "Diesel", "Electric", "Hybrid"]),
    image: faker.image.url(),
    status: pick(["Available", "Unavailable"]),
  };
}

export async function seedCars({ clear = true, owners = null } = {}) {
  const didConnect = await connectIfNeeded();
  try {
    if (!owners) owners = await User.find({ role: "CarOwner" });
    if (!owners.length) throw new Error("No owners found. Seed users first or run seedAll.");

    if (clear) await Car.deleteMany({});

    const plates = new Set();
    const cars = [];
    for (const owner of owners) {
      const count = randomInt(CARS_PER_OWNER_MIN, CARS_PER_OWNER_MAX);
      for (let i = 0; i < count; i++) {
        let plate;
        do { plate = makePlate(); } while (plates.has(plate));
        plates.add(plate);
        cars.push(makeCar(owner, plate));
      }
    }

    const inserted = await Car.insertMany(cars, { ordered: true });
    console.log(`🚗 Inserted cars: ${inserted.length}`);
    return inserted;
  } finally {
    await disconnectIf(didConnect);
  }
}

async function main() {
  await seedCars({ clear: true });
}
const isDirect = pathToFileURL(process.argv[1]).href === import.meta.url;
if (isDirect) main().catch(e => { console.error(e); process.exit(1); });