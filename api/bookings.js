import dbConnect from "../lib/dbConnect.js";
import Booking from "../models/Booking.js";

export default async function handler(req, res) {

    /**
     * ✅ CORS FIX (ADD THIS AT TOP)
     */
    const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:8080",
        "https://kabadsathi.in",
        "https://www.kabadsathi.in",
        "https://kabadsathi.vercel.app"
    ];

    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }

    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    // ✅ Handle preflight request
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    /**
     * ✅ DB CONNECT
     */
    await dbConnect();

    /**
     * ✅ API LOGIC
     */
    if (req.method === "POST") {
        try {
            const booking = await Booking.create(req.body);
            res.status(201).json({ success: true, data: booking });
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    } else if (req.method === "GET") {
        try {
            const bookings = await Booking.find({});
            res.status(200).json({ success: true, data: bookings });
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    } else {
        res.status(405).json({ success: false, message: "Method not allowed" });
    }
}