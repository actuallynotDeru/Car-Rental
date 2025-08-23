import User from "../models/User.js";

//get all users
export const getUsers = async(req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

export const getUsersById = async(req, res) => {
    try {
        const users = await User.findById(req.params.id);
        if(!users) return res.status(404).json({ message: "User not found" });
        res.json(users);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}

//create a user
export const createUser = async(req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
};

//update a user
export const updateUser = async(req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//delete a user
export const deleteUser = async(req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted" });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};