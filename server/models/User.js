import mongoose from "mongoose";

// 1. Define schema
const userSchema = new mongoose.Schema({
    
    fullName: {
        type: String,
        required: true,
        maxlength: 100,
        unique: true,
    },

    age: {
        type: Number,
        required: true,
    },

    gender: {
        type: String,
        required: true,
        maxlength: 10,
    },

    email: {
        type: String,
        required: true,
        maxlength: 30,
    },

    fullAddress: {
        type: String,
        required: true,
        maxlength: 50,
    },

    province: {
        type: String,
        required: true,
        maxlength: 25,
    },

    street: {
        type: String,
        required: true,
        maxlength: 25,
    },

    zip: {
        type: Number,
        required: true,
    },

    city: {
        type: String,
        required: true,
        maxlength: 25,
    },

    country: {
        type: String,
        required: true,
        maxlength: 20,
    },

    phone: {
        type: String,
        required: true,
    },

    dateJoined: {
        type: Date,
        default: Date.now,
    },

    password: {
        type: String,
        required: false,
    },

    role: {
        type: String,
        enum: ["Customer", "Admin", "CarOwner", "Registrar"],
        default: "Customer",
    },

    status: {
        type: String,
        enum: ["Verified", "Unverified"],
        default: "Unverified",
    },

    failedAttempts: {
        type: Number,
        default: 0,
    },

    lastAttempt: {
        type: Date,
        default: null,
    },

    resetToken: {
        type: String,
        default: null,
    },

    resetTokenExpiry: {
        type: Date,
        default: null,
    },

    selfiePhoto: {
        type: String,
        default: null,
    },

    idPhoto: {
        type: String,
        default: null,
    },

}, {timestamps: true});

// 2. Create model (collection name will be 'users')
const User = mongoose.model("User", userSchema);

export default User;