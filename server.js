// // const express = require("express");
// // const mongoose = require("mongoose");
// // const dotenv = require("dotenv");
// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();

// // Middleware to parse JSON
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log("MongoDB Connected"))
//     .catch((err) => console.error(err));

// // Routes
// const userRoutes = require("./routes/userRoutes");
// app.use("/api/users", userRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });


import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Added CORS for frontend safety

// 1. Import your routes using 'import' instead of 'require'
// Note: In ES Modules, you often need the .js extension in the path
import userRoutes from './routes/userRoutes.js'; 

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 2. Database Connection Logic
// We store it in a variable to prevent multiple connections in serverless
const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) return;
        
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err.message);
    }
};

connectDB();

// 3. Routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("API is running...");
});

// 4. Vercel Support
// Only use app.listen for local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// CRITICAL: Export the app for Vercel to handle
export default app;