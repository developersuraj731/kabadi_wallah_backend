import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "../lib/dbConnect.js";
import userRoutes from "../routes/userRoutes.js";
import pricingRoutes from "../routes/pricingRoutes.js";
import Booking from "../models/Booking.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
app.use(async (req, res, next) => {
    try {
        await dbConnect();
        next();
    } catch (error) {
        res.status(500).json({ message: "Database connection failed", error: error.message });
    }
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/pricings", pricingRoutes);

// Bookings routes
app.post("/api/bookings", async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();
        res.status(201).json({ success: true, message: "Booking created", data: booking });
    } catch (error) {
        res.status(400).json({ success: false, message: "Error creating booking", error: error.message });
    }
});

app.get("/api/getBookings", async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, message: "Bookings fetched", data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching bookings", error: error.message });
    }
});

// Health check
app.get("/", (req, res) => {
    res.status(200).json({ message: "✅ API is running" });
});

// Start server only in development
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}

export default app;



// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import connectDB from "../config/mongodb.js";
// import Booking from "../models/Booking.js";

// dotenv.config();

// const app = express();
// app.use(express.json());

// // Connect to MongoDB
// connectDB();

// // Routes
// app.get("/", (req, res) => {
//     res.send("KabadiWallah API is running 🚀");
// });

// app.post("/api/bookings", async (req, res) => {
//     try {
//         const newBooking = new Booking(req.body);
//         await newBooking.save();
//         res.status(200).json({ message: "Booking created successfully", booking: newBooking });
//     } catch (error) {
//         res.status(400).json({ message: "Error creating booking", error: error.message });
//     }
// });

// app.get("/api/bookings", async (req, res) => {
//     try {
//         const bookings = await Booking.find();
//         res.status(200).json(bookings);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching bookings", error: error.message });
//     }
// });

// // For local dev: listen on PORT
// if (process.env.NODE_ENV !== "production") {
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// }

// // Export for Vercel
// export default app;

