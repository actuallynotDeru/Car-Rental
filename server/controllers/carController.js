import Car from "../models/Cars.js";

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

// Create a new car
export const createCar = async (req, res) => {
    try {
        const car = new Car(req.body);
        await car.save();
        res.status(201).json(car);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a car
export const updateCar = async (req, res) => {
    try {
        const car = await Car.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }
        
        res.json(car);
    } catch (err) {
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
        
        res.json({ message: "Car deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};