import mongoose from "mongoose";
export const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("DB connected :)");
  } catch (err) {
    throw new Error("Could not connect to MongoDB");
  }
};
