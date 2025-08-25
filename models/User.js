const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    completeAddress: {
        type: String,
        required: true,
    },
    scrapType: {
        type: String,
        required: true,
    },
    estimatedWeight: {
        type: Number,
        required: true,
    },
    preferredDate: {
        type: String, // keep as string like "2025-08-26", or use Date if you want
        required: true,
    },
    preferredTime: {
        type: String, // e.g. "10:00 AM - 12:00 PM"
        required: true,
    },
}, { timestamps: true, collection: 'Booking' });

// module.exports = mongoose.model("User", userSchema);
// export default mongoose.models.User || mongoose.model("User", userSchema);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
