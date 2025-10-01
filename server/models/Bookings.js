import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({

    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },

    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
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

    idPhoto: {
        type: String,
        default: null,
    },

}, {timestamps: true});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;