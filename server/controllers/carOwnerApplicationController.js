import CarOwnerApplication from "../models/CarOwnerApplication.js";
import User from "../models/User.js";

export const getAllApplications = async (req, res) => {
    try {
        const applications = await CarOwnerApplication.find()
            .populate('userId', 'fullName email phone')
            .populate('reviewedBy', 'fullName email')
            .sort({ createdAt: -1 });
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getApplicationById = async (req, res) => {
    try {
        const application = await CarOwnerApplication.findById(req.params.id)
            .populate('userId', 'fullName email phone')
            .populate('reviewedBy', 'fullName email');
        
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }
        
        res.json(application);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getApplicationsByUser = async (req, res) => {
    try {
        const applications = await CarOwnerApplication.find({ userId: req.params.userId })
            .populate('reviewedBy', 'fullName email')
            .sort({ createdAt: -1 });
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createApplication = async (req, res) => {
    try {
        const applicationData = req.body;
        
        // Check if user exists
        const user = await User.findById(applicationData.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // Check if user is already a CarOwner
        if (user.role === "CarOwner") {
            return res.status(400).json({ message: "User is already a car owner" });
        }
        
        // Check if user already has a pending application
        const existingApplication = await CarOwnerApplication.findOne({
            userId: applicationData.userId,
            status: "Pending"
        });
        
        if (existingApplication) {
            return res.status(400).json({ message: "User already has a pending application" });
        }
        
        // Save uploaded document paths
        if (req.files) {
            if (req.files.drivingLicense) {
                applicationData.drivingLicense = `/uploads/business/${req.files.drivingLicense[0].filename}`;
            }
            if (req.files.businessLicense) {
                applicationData.businessLicense = `/uploads/business/${req.files.businessLicense[0].filename}`;
            }
        }
        
        const application = new CarOwnerApplication(applicationData);
        await application.save();
        
        const populatedApplication = await CarOwnerApplication.findById(application._id)
            .populate('userId', 'fullName email phone');
            
        res.status(201).json(populatedApplication);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const reviewApplication = async (req, res) => {
    try {
        const { status, adminNotes, reviewedBy } = req.body;
        
        if (!["Approved", "Rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status. Must be 'Approved' or 'Rejected'" });
        }
        
        const application = await CarOwnerApplication.findById(req.params.id);
        
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }
        
        if (application.status !== "Pending") {
            return res.status(400).json({ message: "Application has already been reviewed" });
        }
        
        // Update application
        application.status = status;
        application.adminNotes = adminNotes;
        application.reviewedBy = reviewedBy;
        application.reviewedAt = new Date();
        
        await application.save();
        
        // If approved, update user role to CarOwner
        if (status === "Approved") {
            await User.findByIdAndUpdate(application.userId, { role: "CarOwner" });
        }
        
        const populatedApplication = await CarOwnerApplication.findById(application._id)
            .populate('userId', 'fullName email phone')
            .populate('reviewedBy', 'fullName email');
            
        res.json(populatedApplication);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateApplication = async (req, res) => {
    try {
        const application = await CarOwnerApplication.findById(req.params.id);
        
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }
        
        if (application.status !== "Pending") {
            return res.status(400).json({ message: "Cannot update a reviewed application" });
        }
        
        const updateData = req.body;
        
        // Save new documents if uploaded
        if (req.files) {
            if (req.files.drivingLicense) {
                updateData.drivingLicense = `/uploads/business/${req.files.drivingLicense[0].filename}`;
            }
            if (req.files.businessLicense) {
                updateData.businessLicense = `/uploads/business/${req.files.businessLicense[0].filename}`;
            }
        }
        
        const updatedApplication = await CarOwnerApplication.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        ).populate('userId', 'fullName email phone');
        
        res.json(updatedApplication);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteApplication = async (req, res) => {
    try {
        const application = await CarOwnerApplication.findByIdAndDelete(req.params.id);
        
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }
        
        res.json({ message: "Application deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};