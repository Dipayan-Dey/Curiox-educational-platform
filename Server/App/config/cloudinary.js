// config/cloudinary.js
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.COULD_API_KEY, // check your .env spelling
  api_secret: process.env.COULD_SECRET_API_KEY,
});

console.log("✅ Cloudinary configured");

export default cloudinary;
