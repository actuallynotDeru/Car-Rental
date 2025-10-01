import { faker } from "@faker-js/faker";
import { connectIfNeeded, disconnectIf, pick, randomInt, truncate } from "./helpers.js";
import User from "../models/User.js";
import { pathToFileURL } from "url";

const NUM_ADMINS = 1;
const NUM_CUSTOMERS = 12;
const NUM_OWNERS = 6;

function makeUser(role = "Customer", overrides = {}) {
    const gender = pick(["Male", "Female"]);
    const first = faker.person.firstName(gender.toLowerCase());
    const last = faker.person.lastName();
    const fullName = truncate(`${first} ${last}`, 100);
    const age = randomInt(18, 65);
    const phone = faker.phone.number();
    const password = null;
    const status = pick(["Verified", "Unverified"]);

    const street = truncate(faker.location.street(), 25);
    const city = truncate(faker.location.city(), 25);
    const province = truncate(faker.location.state(), 25);
    const country = truncate(faker.location.country(), 25);
    const zip = Number(faker.location.zipCode().replace(/\D/g, "").slice(0, 5)) || randomInt(10000, 99999);

    const emailLocal = `${first}.${last}`.toLowerCase().replace(/[^a-z0-9.]+/g, "");
    const email = truncate(`${emailLocal}@example.com`, 30);
    const fullAddress = truncate(`${street}, ${city}`, 50);

    return {
        fullName,
        age,
        gender,
        email,
        fullAddress,
        province,
        street,
        zip,
        city,
        country,
        phone,
        password,
        role,
        status,
        selfiePhoto: null,
        idPhoto: null,
        ...overrides,
    };
}

export async function seedUsers({ clear = true } = {}) {
    const didConnect = await connectIfNeeded();
    try {
        if (clear) await User.deleteMany({});
        const desired = [
            ...Array.from({ length: NUM_ADMINS }, () => makeUser("Admin", { status: "Verified" })),
            ...Array.from({ length: NUM_OWNERS }, () => makeUser("CarOwner")),
            ...Array.from({ length: NUM_CUSTOMERS }, () => makeUser("Customer")),
        ];

        const seen = new Set();
        const users = [];
        for (const u of desired) {
            if (seen.has(u.fullName)) continue;
            seen.add(u.fullName);
            users.push(u);
        }

        while (users.length < desired.length) {
            const role = users.length < NUM_ADMINS ? "Admin" : users.length < NUM_ADMINS + NUM_OWNERS ? "CarOwner" : "Customer";
            const u = makeUser(role);
            if (!seen.has(u.fullName)) {
                seen.add(u.fullName);
                users.push(u);
            }
        }

        const inserted = await User.insertMany(users, { ordered: true });
        console.log(`Inserted users: ${inserted.length}`);
        return inserted;
    } finally {
        await disconnectIf(didConnect);
    }
}

const createUsers = async () => {
    const users = [];

    for (let i = 0; i < 20; i++) {
        users.push({
            fullName: faker.person.fullName(),
            age: faker.number.int({ min: 18, max: 70 }),
            gender: faker.person.sex(),
            email: faker.internet.email(),
            fullAddress: faker.location.streetAddress(),
            province: faker.location.state(),
            street: faker.location.street(),
            zip: faker.number.int({ min: 10000, max: 99999 }),
            city: faker.location.city(),
            country: faker.location.country(),
            phone: faker.phone.number(),
            password: faker.internet.password(),
            role: faker.helpers.arrayElement(["Customer", "Admin", "CarOwner", "Registrar"]),
            status: faker.helpers.arrayElement(["Verified", "Unverified"]),
            failedAttempts: faker.number.int({ min: 0, max: 5 }),
            selfiePhoto: faker.image.avatar(),
        });
    }

    await User.insertMany(users);
    console.log("Users seeded successfully");
};

async function main() {
    await seedUsers({ clear: true });
}
const isDirect = pathToFileURL(process.argv[1]).href === import.meta.url;
if (isDirect) main().catch((e) => { console.error(e); process.exit(1); });