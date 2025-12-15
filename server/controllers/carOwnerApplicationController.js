import CarOwnerApplication from "../models/CarOwnerApplication.js";
import User from "../models/User.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    console.log('=== CREATE APPLICATION DEBUG ===');
    console.log('Files received:', req.files);
    console.log('Body received:', req.body);
    
    // Access files via multer
    const drivingLicenseFile = req.files['drivingLicense']?.[0];
    const businessLicenseFile = req.files['businessLicense']?.[0];

    if (!drivingLicenseFile || !businessLicenseFile) {
      return res.status(400).json({ message: 'Both driving license and business license files are required' });
    }

    // Log file paths to debug
    console.log('Driving License Path:', drivingLicenseFile.path);
    console.log('Business License Path:', businessLicenseFile.path);

    // Check if files actually exist
    if (!fs.existsSync(drivingLicenseFile.path)) {
      console.error('Driving license file does not exist at:', drivingLicenseFile.path);
      return res.status(500).json({ message: 'Failed to save driving license file' });
    }
    
    if (!fs.existsSync(businessLicenseFile.path)) {
      console.error('Business license file does not exist at:', businessLicenseFile.path);
      return res.status(500).json({ message: 'Failed to save business license file' });
    }

    // Collect other form fields from req.body
    const {
      userId,
      businessName,
      businessAddress,
      businessPhone,
      businessEmail,
      taxId,
      description
    } = req.body;

    // Validate required fields
    if (!userId || !businessName || !businessAddress || !businessPhone || !businessEmail || !taxId) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Store the relative path from uploads folder
    // Multer saves to uploads/business/, so we just need the filename
    const drivingLicensePath = `/uploads/business/${drivingLicenseFile.filename}`;
    const businessLicensePath = `/uploads/business/${businessLicenseFile.filename}`;

    console.log('Saving to DB with paths:', {
      drivingLicense: drivingLicensePath,
      businessLicense: businessLicensePath
    });

    // Create application data
    const applicationData = {
      userId,
      businessName,
      businessAddress,
      businessPhone,
      businessEmail,
      taxId,
      description: description || '',
      drivingLicense: drivingLicensePath,
      businessLicense: businessLicensePath,
    };

    // Save to database
    const application = await CarOwnerApplication.create(applicationData);
    
    console.log('Application created:', application._id);
    
    // Populate user data before sending response
    const populatedApplication = await CarOwnerApplication.findById(application._id)
      .populate('userId', 'fullName email phone');

    res.status(201).json({ 
      message: 'Application submitted successfully', 
      application: populatedApplication 
    });
  } catch (err) {
    console.error('=== CREATE APPLICATION ERROR ===');
    console.error('Error details:', err);
    console.error('Stack trace:', err.stack);
    res.status(500).json({ message: err.message || 'Internal server error' });
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