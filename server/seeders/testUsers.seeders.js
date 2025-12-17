import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { connectIfNeeded, disconnectIf } from "./helpers.js";
import { pathToFileURL } from "url";

// Define test users with fixed credentials
const TEST_USERS = [
  {
    fullName: "Admin Test User",
    age: 30,
    gender: "Male",
    email: "admin@test.com",
    password: "admin123",
    fullAddress: "123 Admin Street, Admin City",
    province: "Metro Manila",
    street: "Admin Street",
    zip: 10001,
    city: "Manila",
    country: "Philippines",
    phone: "+63-917-1234567",
    role: "Admin",
    status: "Verified",
  },
  {
    fullName: "Car Owner Test User",
    age: 35,
    gender: "Male",
    email: "carowner@test.com",
    password: "owner123",
    fullAddress: "456 Owner Avenue, Owner City",
    province: "Cebu",
    street: "Owner Avenue",
    zip: 60001,
    city: "Cebu City",
    country: "Philippines",
    phone: "+63-917-2345678",
    role: "CarOwner",
    status: "Verified",
  },
  {
    fullName: "Customer Test User",
    age: 28,
    gender: "Female",
    email: "customer@test.com",
    password: "customer123",
    fullAddress: "789 Customer Road, Customer City",
    province: "Davao del Sur",
    street: "Customer Road",
    zip: 80001,
    city: "Davao City",
    country: "Philippines",
    phone: "+63-917-3456789",
    role: "Customer",
    status: "Verified",
  },
  {
    fullName: "Registrar Test User",
    age: 32,
    gender: "Female",
    email: "registrar@test.com",
    password: "registrar123",
    fullAddress: "321 Registrar Lane, Registrar City",
    province: "Laguna",
    street: "Registrar Lane",
    zip: 40001,
    city: "Santa Rosa",
    country: "Philippines",
    phone: "+63-917-4567890",
    role: "Registrar",
    status: "Verified",
  },
];

export async function seedTestUsers({ skipIfExists = true } = {}) {
  const didConnect = await connectIfNeeded();
  try {
    const createdUsers = [];
    
    for (const userData of TEST_USERS) {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      
      if (existingUser) {
        if (skipIfExists) {
          console.log(`✓ Test user already exists: ${userData.email}`);
          createdUsers.push(existingUser);
          continue;
        } else {
          // Update existing user
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(userData.password, salt);
          
          await User.findByIdAndUpdate(existingUser._id, {
            ...userData,
            password: hashedPassword,
          });
          console.log(`✓ Updated test user: ${userData.email}`);
          createdUsers.push(existingUser);
          continue;
        }
      }
      
      // Hash password before saving
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      
      // Create new test user
      const newUser = new User({
        ...userData,
        password: hashedPassword,
        failedAttempts: 0,
        selfiePhoto: null,
      });
      
      await newUser.save();
      console.log(`✓ Created test user: ${userData.email}`);
      createdUsers.push(newUser);
    }
    
    console.log(`\n📋 Test Users Summary:`);
    console.log(`================================`);
    TEST_USERS.forEach(user => {
      console.log(`Email: ${user.email}`);
      console.log(`Password: ${user.password}`);
      console.log(`Role: ${user.role}`);
      console.log(`--------------------------------`);
    });
    
    return createdUsers;
  } finally {
    await disconnectIf(didConnect);
  }
}

async function main() {
  await seedTestUsers({ skipIfExists: true });
}

const isDirect = pathToFileURL(process.argv[1]).href === import.meta.url;
if (isDirect) main().catch(e => { console.error(e); process.exit(1); });