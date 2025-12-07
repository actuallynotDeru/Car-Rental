import Booking from "../models/Bookings.js";

export const getBookings = async(req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('customerId ownerId', 'fullName email phone')
            .populate('carId', 'name price image');
        res.json(bookings);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

export const getBookingById = async(req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('customerId ownerId')
            .populate('carId');
        if(!booking) return res.status(404).json({ message: "Booking not found" });
        res.json(booking);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

export const createBooking = async(req, res) => {
    try {
        const bookingData = req.body;
        
        // Save uploaded file paths
        if (req.files) {
            if (req.files.paymentProof) {
                bookingData.paymentProof = `/uploads/payments/${req.files.paymentProof[0].filename}`;
            }
            if (req.files.idPhoto) {
                bookingData.idPhoto = `/uploads/ids/${req.files.idPhoto[0].filename}`;
            }
        }
        
        const booking = new Booking(bookingData);
        await booking.save();
        res.status(201).json(booking);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateBooking = async(req, res) => {
    try {
        const bookingData = req.body;
        
        // Save new uploaded files if any
        if (req.files) {
            if (req.files.paymentProof) {
                bookingData.paymentProof = `/uploads/payments/${req.files.paymentProof[0].filename}`;
            }
            if (req.files.idPhoto) {
                bookingData.idPhoto = `/uploads/ids/${req.files.idPhoto[0].filename}`;
            }
        }
        
        const booking = await Booking.findByIdAndUpdate(req.params.id, bookingData, { new: true });
        if(!booking) return res.status(404).json({ message: "Booking not found" });
        res.json(booking);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteBooking = async(req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.json({ message: "Booking deleted" });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};