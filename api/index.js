// // api/index.js
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// // --- Import model ---
// import User from "../models/User.js";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// let isConnected = false;
// async function connectDB() {
//     if (isConnected) return;
//     await mongoose.connect(process.env.MONGO_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     });
//     isConnected = true;
//     console.log("✅ MongoDB connected");
// }


// // --- POST API (create booking) ---
// app.post("/bookings", async (req, res) => {
//     try {
//         await connectDB();
//         const user = new User(req.body);
//         await user.save();
//         res.status(200).json({ message: "Booking created", data: user });
//     } catch (error) {
//         res.status(500).json({ message: "Error creating booking", error });
//     }
// });

// // --- GET API (fetch all bookings) ---
// app.get("/bookings", async (req, res) => {
//     try {
//         await connectDB();
//         const bookings = await User.find();
//         res.status(200).json({ message: "Bookings fetched", data: bookings });
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching bookings", error });
//     }
// });

// export default app;


import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/mongodb.js";
import Booking from "../models/Booking.js";

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.get("/", (req, res) => {
    res.send("KabadiWallah API is running 🚀");
});

app.post("/api/bookings", async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.status(200).json({ message: "Booking created successfully", booking: newBooking });
    } catch (error) {
        res.status(400).json({ message: "Error creating booking", error: error.message });
    }
});

app.get("/api/bookings", async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings", error: error.message });
    }
});

// For local dev: listen on PORT
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export for Vercel
export default app;

