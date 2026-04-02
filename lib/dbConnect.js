import mongoose from "mongoose";

let isConnected = false;

const dbConnect = async () => {
    if (isConnected) {
        console.log("✅ Already connected to MongoDB");
        return;
    }

    try {
        console.log("🔄 Connecting to MongoDB...");
        console.log("URI:", process.env.MONGO_URI ? "✅ Configured" : "❌ Not configured");
        
        await mongoose.connect(process.env.MONGO_URI, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            retryWrites: true,
        });
        isConnected = true;
        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        console.error("Error Code:", error.code);
        console.error("Full Error:", error);
        throw error;
    }
};

export default dbConnect;
