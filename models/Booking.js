import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    completeAddress: { type: String, required: true },
    scrapType: { type: String, required: true },
    estimatedWeight: { type: String, required: true },
    preferredDate: { type: String, required: true },
    preferredTime: { type: String, required: true },
}, { timestamps: true, collection: 'Bookings' });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
