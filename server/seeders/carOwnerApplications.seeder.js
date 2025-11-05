import { faker } from "@faker-js/faker";
import { connectIfNeeded, disconnectIf, pick, randomInt } from "./helpers.js";
import { pathToFileURL } from "url";
import CarOwnerApplication from "../models/CarOwnerApplication.js";
import User from "../models/User.js";

const APPLICATIONS_COUNT = 8;

function makeApplication(customer) {
  return {
    userId: customer._id,
    businessName: faker.company.name(),
    businessAddress: faker.location.streetAddress(),
    businessPhone: faker.phone.number(),
    businessEmail: faker.internet.email(),
    taxId: faker.string.alphanumeric(10).toUpperCase(),
    drivingLicense: faker.image.url(),
    businessLicense: faker.image.url(),
    description: faker.lorem.paragraph(),
    status: pick(["Pending", "Approved", "Rejected"]),
  };
}

export async function seedCarOwnerApplications({ clear = true, customers = null } = {}) {
  const didConnect = await connectIfNeeded();
  try {
    if (!customers) customers = await User.find({ role: "Customer" });
    if (!customers.length) throw new Error("No customers found. Seed users first.");

    if (clear) await CarOwnerApplication.deleteMany({});

    const applications = [];
    const usedCustomers = new Set();
    
    for (let i = 0; i < Math.min(APPLICATIONS_COUNT, customers.length); i++) {
      let customer;
      do {
        customer = pick(customers);
      } while (usedCustomers.has(customer._id.toString()));
      
      usedCustomers.add(customer._id.toString());
      applications.push(makeApplication(customer));
    }

    const inserted = await CarOwnerApplication.insertMany(applications, { ordered: true });
    console.log(`📋 Inserted car owner applications: ${inserted.length}`);
    return inserted;
  } finally {
    await disconnectIf(didConnect);
  }
}

async function main() {
  await seedCarOwnerApplications({ clear: true });
}

const isDirect = pathToFileURL(process.argv[1]).href === import.meta.url;
if (isDirect) main().catch(e => { console.error(e); process.exit(1); });