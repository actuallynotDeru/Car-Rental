import mongoose from "mongoose";

// 1. Define schema
const userSchema = new mongoose.Schema({
    
});

// 2. Create model (collection name will be 'users')
const User = mongoose.model("User", userSchema);

export default User;