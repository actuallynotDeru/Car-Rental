import User from "../models/User.js";

export const getUsers = async(req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

export const getUserById = async(req, res) => {
    try {
        const users = await User.findById(req.params.id);
        if(!users) return res.status(404).json({ message: "User not found" });
        res.json(users);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}

export const createUser = async(req, res) => {
    try {
        const userData = req.body;
        
        // If selfie uploaded, save path
        if (req.file) {
            userData.selfiePhoto = `/uploads/profiles/${req.file.filename}`;
        }
        
        const user = new User(userData);
        await user.save();
        res.status(201).json(user);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateUser = async(req, res) => {
    try {
        const userData = req.body;
        
        // If new selfie uploaded
        if (req.file) {
            userData.selfiePhoto = `/uploads/profiles/${req.file.filename}`;
        }
        
        const user = await User.findByIdAndUpdate(req.params.id, userData, { new: true });
        if(!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteUser = async(req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted" });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};