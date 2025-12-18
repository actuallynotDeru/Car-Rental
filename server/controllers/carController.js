import Car from "../models/Cars.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all cars by owner ID
export const getCarsByOwnerId = async (req, res) => {
  try {
      const { ownerId } = req.params;
      const cars = await Car.find({ ownerId }).populate('ownerId', 'fullName email');
      
      if (!cars || cars.length === 0) {
          return res.status(404).json({ message: "No cars found for this owner" });
      }
      
      res.json(cars);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

// Get all cars
export const getAllCars = async (req, res) => {
  try {
      const cars = await Car.find().populate('ownerId', 'fullName email');
      res.json(cars);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

// Get single car by ID
export const getCarById = async (req, res) => {
  try {
      const car = await Car.findById(req.params.id).populate('ownerId', 'fullName email');
      if (!car) {
          return res.status(404).json({ message: "Car not found" });
      }
      res.json(car);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

// Create a new car with file upload
export const createCar = async (req, res) => {
  try {
      const {
          ownerId,
          name,
          price,
          seats,
          transmission,
          fuelType,
          plateNumber,
          status,
          rating,
          description,
          location
      } = req.body;

      // Validate required fields
      if (!ownerId || !name || !price || !seats || !transmission || !fuelType || !plateNumber) {
          return res.status(400).json({ message: 'All required fields must be provided' });
      }

      // Handle image upload
      let imagePath = '/placeholder-car.png';
      if (req.files && req.files.length > 0) {
          const imageFile = req.files[0];
          imagePath = `/uploads/cars/${imageFile.filename}`;
          console.log('Image saved at:', imagePath);
      }

      const car = new Car({
          ownerId,
          name,
          price: Number(price),
          carDetails: {
              seats: Number(seats),
              transmission,
              fuelType,
              plateNumber
          },
          rating: rating ? Number(rating) : 5.0,
          image: imagePath,
          status: status || 'Available',
          description: description || '',
          location: location || ''
      });

      await car.save();
      
      // Populate owner info before sending response
      const populatedCar = await Car.findById(car._id).populate('ownerId', 'fullName email');
      res.status(201).json(populatedCar);
  } catch (err) {
      console.error('Error creating car:', err);
      res.status(400).json({ message: err.message });
  }
};

// Update a car with optional file upload
export const updateCar = async (req, res) => {
  try {
      const existingCar = await Car.findById(req.params.id);
      if (!existingCar) {
          return res.status(404).json({ message: "Car not found" });
      }

      const {
          name,
          price,
          seats,
          transmission,
          fuelType,
          plateNumber,
          status,
          description,
          location
      } = req.body;

      // Build update object
      const updateData = {};
      
      if (name) updateData.name = name;
      if (price) updateData.price = Number(price);
      if (status) updateData.status = status;
      if (description !== undefined) updateData.description = description;
      if (location !== undefined) updateData.location = location;

      // Handle carDetails
      if (seats || transmission || fuelType || plateNumber) {
          updateData.carDetails = {
              seats: seats ? Number(seats) : existingCar.carDetails.seats,
              transmission: transmission || existingCar.carDetails.transmission,
              fuelType: fuelType || existingCar.carDetails.fuelType,
              plateNumber: plateNumber || existingCar.carDetails.plateNumber
          };
      }

      // Handle new image upload
      if (req.files && req.files.length > 0) {
          const imageFile = req.files[0];
          const newImagePath = `/uploads/cars/${imageFile.filename}`;
          
          // Delete old image file if it exists and is not a placeholder
          if (existingCar.image && !existingCar.image.includes('placeholder')) {
              const oldImagePath = path.join(__dirname, '..', existingCar.image);
              if (fs.existsSync(oldImagePath)) {
                  fs.unlinkSync(oldImagePath);
                  console.log('Deleted old image:', oldImagePath);
              }
          }
          
          updateData.image = newImagePath;
          console.log('New image saved at:', newImagePath);
      }

      const car = await Car.findByIdAndUpdate(
          req.params.id,
          updateData,
          { new: true, runValidators: true }
      ).populate('ownerId', 'fullName email');

      res.json(car);
  } catch (err) {
      console.error('Error updating car:', err);
      res.status(400).json({ message: err.message });
  }
};

// Delete a car
export const deleteCar = async (req, res) => {
  try {
      const car = await Car.findByIdAndDelete(req.params.id);
      
      if (!car) {
          return res.status(404).json({ message: "Car not found" });
      }

      // Delete associated image file if it exists and is not a placeholder
      if (car.image && !car.image.includes('placeholder')) {
          const imagePath = path.join(__dirname, '..', car.image);
          if (fs.existsSync(imagePath)) {
              fs.unlinkSync(imagePath);
              console.log('Deleted car image:', imagePath);
          }
      }
      
      res.json({ message: "Car deleted successfully" });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};