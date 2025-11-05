import mongoose from "mongoose";

const carOwnerApplicationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    businessName: {
        type: String,
        required: true,
        maxlength: 100,
    },

    businessAddress: {
        type: String,
        required: true,
        maxlength: 100,
    },

    businessPhone: {
        type: String,
        required: true,
    },

    businessEmail: {
        type: String,
        required: true,
        maxlength: 50,
    },

    taxId: {
        type: String,
        required: true,
        maxlength: 20,
    },

    drivingLicense: {
        type: String, // URL to uploaded license image
        required: true,
    },

    businessLicense: {
        type: String, // URL to uploaded business license
        required: true,
    },

    description: {
        type: String,
        maxlength: 500,
    },

    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
    },

    adminNotes: {
        type: String,
        maxlength: 300,
        default: null,
    },

    reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },

    reviewedAt: {
        type: Date,
        default: null,
    },

}, { timestamps: true });

const CarOwnerApplication = mongoose.model("CarOwnerApplication", carOwnerApplicationSchema);

export default CarOwnerApplication;