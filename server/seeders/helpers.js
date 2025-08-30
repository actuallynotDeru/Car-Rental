import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const MONGOURL = process.env.ATLAS_URI;

export async function connectIfNeeded() {
    if(mongoose.connection.readyState === 1) return false;
    if(!MONGOURL) throw new Error("ATLAS_URI is missing in environment");
    await mongoose.connect(MONGOURL);
    console.log("Connected to MongoDB");
    return true;
}

export async function disconnectIf(didConnect) {
    if(didConnect) {
        await mongoose.disconnect();
        console.log("Disconnected successfully");
    }
}

export function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function truncate(str, max) {
    if(!str) return str;
    return str.length > max ? str.slice(0, max) : str;
}