import Car from "../models/Cars.js";

//get all cars
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

//create a car
export const createCar = async(req, res) => {
    try {
        const car = new Car(req.body);
        await car.save();
        res.status(201).json(car);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
};

//update a car
export const updateCar = async(req, res) => {
    try {
        const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(car);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
};

//delete a car
export const deleteCar = async(req, res) => {
    try {
        await Car.findByIdAndDelete(req.params.id);
        res.json({ message: "Car deleted" });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};