import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const mongoUrl = process.env.MONGODB_URL;

const app = express();
const port = process.env.PORT || 5005;

try {
    await mongoose.connect(mongoUrl);
    console.log("MongoDB succesfully connected");
} catch (error) {
    console.log(`MongoDB is not connected!!, Error:${error?.message}`);
}

