import mongoose from "mongoose";
import dns from "dns";

// Prefer Google DNS and IPv4 to avoid common MongoDB Atlas resolution issues.
dns.setServers(['8.8.8.8',"8.8.4.4"])
dns.setDefaultResultOrder("ipv4first")

const connectDB = async () => {
  try {
    // Reuse Mongoose's connection handling for the configured Mongo URI.
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected successfully");
  } catch (error) {
    console.log("error connecting Database", error);
  }
};

export default connectDB;
