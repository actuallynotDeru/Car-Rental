import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.ATLAS_URI;

if (!uri) {
  throw new Error("❌ MongoDB connection string (ATLAS_URI) is missing in .env");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // Connect the client to the server
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("✅ Pinged your deployment. Successfully connected to MongoDB!");
} catch (err) {
  console.error("❌ MongoDB Connection Error:", err.message);
}

const db = client.db("employees");

export default db;
