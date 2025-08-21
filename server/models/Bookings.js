import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({

    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: false,
    },

    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cars",
        required: false,
    },

    pickupDate: {
        type: Date,
        required: false,
    },

    returnDate: {
        type: Date,
        required: false,
    },

    pickupLocation: {
        type: String,
        required: false,
    },

    totalPrice: {
        type: Number,
        required: false,
    },

    paymentProof: {
        type: String,
        required: false,
    },

    status: {
        type: String,
        enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
        required: false,
    },

}, {timestamps: true});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;