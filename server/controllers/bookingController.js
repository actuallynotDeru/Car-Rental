import Booking from "../models/Bookings.js";

//get all bookings
export const getBookings = async(req, res) => {
    try {
        const bookings = await Booking.find().populate("customer car");
        res.json(bookings);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

export const getBookingsById = async(req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if(!booking) return res.status(404).json({ message: "Booking not found" });
        res.json(booking);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}

//create a booking
export const createBooking = async(req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();
        res.status(201).json(booking);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
};

//update a booking
export const updateBooking = async(req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(booking);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
};

//delete a booking
export const deleteBooking = async(req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.json({ message: "Booking deleted" });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};