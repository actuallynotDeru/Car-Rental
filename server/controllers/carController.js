import Car from "../models/Cars.js";

export const getCars = async(req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

export const getCarById = async(req, res) => {
    try {
        const cars = await Car.findById(req.params.id);
        if(!cars) return res.status(404).json({ message: "Car not found" });
        res.status(200).json(cars);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}

export const createCar = async(req, res) => {
    try {
        const carData = req.body;
        
        // If images uploaded, save their paths
        if (req.files && req.files.length > 0) {
            carData.images = req.files.map(file => `/uploads/cars/${file.filename}`);
            carData.image = carData.images[0]; // First image as main
        }
        
        const car = new Car(carData);
        await car.save();
        res.status(201).json(car);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateCar = async(req, res) => {
    try {
        const carData = req.body;
        
        // If new images uploaded
        if (req.files && req.files.length > 0) {
            carData.images = req.files.map(file => `/uploads/cars/${file.filename}`);
            carData.image = carData.images[0];
        }
        
        const car = await Car.findByIdAndUpdate(req.params.id, carData, { new: true });
        if(!car) return res.status(404).json({ message: "Car not found" });
        res.json(car);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteCar = async(req, res) => {
    try {
        await Car.findByIdAndDelete(req.params.id);
        res.json({ message: "Car deleted" });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};