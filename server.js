import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

app.use((req, res, next) => {
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

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    next();
});

/**
 * ✅ Allowed Origins (UPDATE THESE)
 */
const allowedOrigins = [
    "http://localhost:8080",
    "http://localhost:5173",
    "https://kabadsathi.in",
    "https://www.kabadsathi.in",
];

/**
 * ✅ CORS Middleware (TOP PRIORITY)
 */
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // Postman / mobile apps

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            console.log("❌ CORS blocked origin:", origin);
            return callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

/**
 * ✅ Vercel FIX (Manual Headers + OPTIONS handling)
 */
app.use((req, res, next) => {
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }

    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});

app.use(express.json());

/**
 * ✅ MongoDB Connection
 */
const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ MongoDB Error:", err.message);
    }
};

/**
 * ✅ Ensure DB connection before every request
 */
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

/**
 * ✅ Routes
 */
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("API is running and CORS is configured.");
});

/**
 * ✅ Local Development Only
 */
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}

export default app;