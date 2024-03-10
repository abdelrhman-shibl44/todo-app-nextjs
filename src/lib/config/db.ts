import mongoose from "mongoose";
export const ConnectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("DB connected :)");
  } catch (err) {
    throw new Error("Could not connect to MongoDB");
  }
};
