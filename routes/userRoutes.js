import express from "express";
import User from "../models/User.js";

const router = express.Router();

// POST - Create new user
router.post("/", async (req, res) => {
    try {
        const { fullName, phoneNumber, completeAddress, scrapType, estimatedWeight, preferredDate, preferredTime } = req.body;

        // Validation
        if (!fullName || !phoneNumber || !completeAddress || !scrapType || !estimatedWeight || !preferredDate || !preferredTime) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create user
        const user = new User({
            fullName,
            phoneNumber,
            completeAddress,
            scrapType,
            estimatedWeight,
            preferredDate,
            preferredTime
        });
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// GET - Fetch all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;
