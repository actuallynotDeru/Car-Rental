import mongoose from "mongoose";

const carsSchema = new mongoose.Schema({

    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    name: {
        type: String,
        required: true,
        maxlength: 50,
    },

    price: {
        type: Number,
        required: true,
    },

    carDetails: {
        seats: {
            type: Number,
            required: true
        },

        transmission: {
            type: String,
            required: true,
            maxlength: 50,
        },

        fuelType: {
            type: String,
            required: true,
            maxlength: 50,
        },

        plateNumber: {
            type: String,
            required: true,
            maxlength: 20,
        }
    },

    rating: {
        type: Number,
        default: 5.0,
        max: 5,
        min: 0,
    },

    image: {
        type: String,
        required: true,
        maxlength: 255,
    },

    status: {
        type: String,
        enum: ["Available", "Unavailable"],
        default: "Available"
    },
    
    description: {
      type: String,
    },
    
    location: {
      type: String,
    }

}, {timestamps: true})

const Car = mongoose.model("Car", carsSchema);

export default Car;