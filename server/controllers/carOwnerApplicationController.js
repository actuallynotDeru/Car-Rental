import CarOwnerApplication from "../models/CarOwnerApplication.js";
import User from "../models/User.js";

// Get all applications (for admin)
export const getAllApplications = async (req, res) => {
    try {
        const applications = await CarOwnerApplication.find()
            .populate("userId", "fullName email phone")
            .populate("reviewedBy", "fullName")
            .sort({ createdAt: -1 });
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get application by ID
export const getApplicationById = async (req, res) => {
    try {
        const application = await CarOwnerApplication.findById(req.params.id)
            .populate("userId", "fullName email phone age gender fullAddress")
            .populate("reviewedBy", "fullName");
        
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }
        
        res.json(application);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get applications by user ID
export const getApplicationsByUser = async (req, res) => {
    try {
        const applications = await CarOwnerApplication.find({ userId: req.params.userId })
            .populate("reviewedBy", "fullName")
            .sort({ createdAt: -1 });
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Submit new application
export const submitApplication = async (req, res) => {
    try {
        const { userId } = req.body;

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if user already has a pending application
        const existingApplication = await CarOwnerApplication.findOne({
            userId,
            status: "Pending"
        });

        if (existingApplication) {
            return res.status(400).json({ 
                message: "You already have a pending application" 
            });
        }

        // Check if user is already a car owner
        if (user.role === "CarOwner") {
            return res.status(400).json({ 
                message: "User is already a car owner" 
            });
        }

        const application = new CarOwnerApplication(req.body);
        await application.save();
        
        res.status(201).json({
            message: "Application submitted successfully",
            application
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Review application (approve/reject)
export const reviewApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, adminNotes, reviewedBy } = req.body;

        if (!["Approved", "Rejected"].includes(status)) {
            return res.status(400).json({ 
                message: "Status must be 'Approved' or 'Rejected'" 
            });
        }

        const application = await CarOwnerApplication.findById(id);
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        if (application.status !== "Pending") {
            return res.status(400).json({ 
                message: "Application has already been reviewed" 
            });
        }

        // Update application
        application.status = status;
        application.adminNotes = adminNotes || null;
        application.reviewedBy = reviewedBy;
        application.reviewedAt = new Date();
        
        await application.save();

        // If approved, update user role to CarOwner
        if (status === "Approved") {
            await User.findByIdAndUpdate(application.userId, { 
                role: "CarOwner" 
            });
        }

        res.json({
            message: `Application ${status.toLowerCase()} successfully`,
            application
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update application (for users to edit pending applications)
export const updateApplication = async (req, res) => {
    try {
        const { id } = req.params;
        
        const application = await CarOwnerApplication.findById(id);
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        if (application.status !== "Pending") {
            return res.status(400).json({ 
                message: "Cannot update application that has been reviewed" 
            });
        }

        const updatedApplication = await CarOwnerApplication.findByIdAndUpdate(
            id, 
            req.body, 
            { new: true }
        );
        
        res.json({
            message: "Application updated successfully",
            application: updatedApplication
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete application
export const deleteApplication = async (req, res) => {
    try {
        const application = await CarOwnerApplication.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        if (application.status === "Approved") {
            return res.status(400).json({ 
                message: "Cannot delete approved application" 
            });
        }

        await CarOwnerApplication.findByIdAndDelete(req.params.id);
        res.json({ message: "Application deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};