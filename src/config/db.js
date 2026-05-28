import mongoose from "mongoose";
import dns from "dns";

// for dns issue and mongo connection error
dns.setServers(['8.8.8.8',"8.8.4.4"])
dns.setDefaultResultOrder("ipv4first")

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected successfully");
  } catch (error) {
    console.log("error connecting Database", error);
  }
};

export default connectDB;
