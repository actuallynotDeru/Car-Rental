import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
    try {
        // Get token from header
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Token is not valid" });
    }
};

// Role-based authorization middleware
export const authorize = (...roles) => {
    return async (req, res, next) => {
        try {
            const User = (await import("../models/User.js")).default;
            const user = await User.findById(req.user.id);
            
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            if (!roles.includes(user.role)) {
                return res.status(403).json({ 
                    message: "Access denied. Insufficient permissions." 
                });
            }

            next();
        } catch (err) {
            res.status(500).json({ message: "Authorization error" });
        }
    };
};