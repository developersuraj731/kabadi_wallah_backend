import express from "express";
import Pricing from "../models/Pricings.js";

const router = express.Router();

// Create a new pricing entry
router.post("/update/", async (req, res) => {
    try {
        const { itemName, minPrice, maxPrice } = req.body;

        if (!itemName || minPrice === undefined || maxPrice === undefined) {
            return res.status(400).json({
                success: false,
                message: "itemName, minPrice and maxPrice are required"
            });
        }

        if (maxPrice < minPrice) {
            return res.status(400).json({
                success: false,
                message: "maxPrice must be greater than or equal to minPrice"
            });
        }

        const pricing = new Pricing({ itemName, minPrice, maxPrice });
        await pricing.save();

        return res.status(201).json({
            success: true,
            message: "Pricing saved",
            data: pricing
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error creating pricing", error: error.message });
    }
});

// Get all pricings
router.get("/getUpdatedPricings", async (req, res) => {
    try {
        const pricings = await Pricing.find().sort({ itemName: 1 });
        return res.status(200).json({ success: true, data: pricings });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching pricings", error: error.message });
    }
});

export default router;
