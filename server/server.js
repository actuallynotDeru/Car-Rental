import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes";
import carRoutes from "./routes/carRoutes";
import bookingRoutes from "./routes/bookingRoutes";

dotenv.config();
const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/bookings", bookingRoutes);

mongoose.connect(process.env.ATLAS_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});