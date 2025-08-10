import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./App/routes/UserRouter.js";
import courseRoute from "./App/routes/CoursesRoute.js";
import AdminRoute from "./App/routes/AdminRoute.js";
import cors from "cors";
import Razorpay from "razorpay";

dotenv.config();

export const Razorpay_instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

const app = express();

app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// Test route
app.get("/", (req, res) => {
  res.send(`Server running on port ${process.env.PORT}`);
});

// Routes
app.use("/api/user", userRouter);
app.use("/api/course", courseRoute);
app.use("/api/admin", AdminRoute);

// Connect to DB and start server
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};

const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
