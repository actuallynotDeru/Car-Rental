import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
};

// Register User
export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullName, email, password, age, gender, phone, fullAddress, province, street, zip, city, country } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Handle selfie photo if uploaded
        let selfiePhotoPath = null;
        if (req.file) {
            selfiePhotoPath = `/uploads/profiles/${req.file.filename}`;
        }

        // Create new user
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            age: age || 18,
            gender: gender || "Male",
            phone: phone || "",
            fullAddress: fullAddress || "",
            province: province || "",
            street: street || "",
            zip: zip || 0,
            city: city || "",
            country: country || "",
            role: "Customer", // Default role
            status: "Unverified",
            selfiePhoto: selfiePhotoPath,
            failedAttempts: 0
        });

        await newUser.save();

        // Generate token
        const token = generateToken(newUser._id);

        // Return user data without password
        const userResponse = {
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            role: newUser.role,
            status: newUser.status,
            selfiePhoto: newUser.selfiePhoto
        };

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: userResponse
        });

    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ message: "Server error during registration", error: err.message });
    }
};

// Login User
export const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check if account is locked due to failed attempts
        if (user.failedAttempts >= 5) {
            return res.status(403).json({ 
                message: "Account locked due to multiple failed login attempts. Please contact support." 
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // Increment failed attempts
            user.failedAttempts += 1;
            await user.save();

            return res.status(400).json({ 
                message: "Invalid credentials",
                attemptsRemaining: 5 - user.failedAttempts
            });
        }

        // Reset failed attempts on successful login
        if (user.failedAttempts > 0) {
            user.failedAttempts = 0;
            await user.save();
        }

        // Generate token
        const token = generateToken(user._id);

        // Return user data without password
        const userResponse = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            status: user.status,
            selfiePhoto: user.selfiePhoto,
            age: user.age,
            gender: user.gender,
            phone: user.phone,
            fullAddress: user.fullAddress
        };

        res.json({
            message: "Login successful",
            token,
            user: userResponse
        });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error during login", error: err.message });
    }
};

// Get Current User (Protected Route)
export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        console.error("Get user error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Logout User (Optional - mainly handled client-side)
export const logout = (req, res) => {
    res.json({ message: "Logout successful" });
};