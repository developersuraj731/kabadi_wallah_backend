import dbConnect from "../lib/dbConnect.js";
import Booking from "../models/Booking.js";

export default async function handler(req, res) {
    await dbConnect();

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
