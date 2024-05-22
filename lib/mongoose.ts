import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true); //to prevent unknown field queries

  if (!process.env.MONGODB_URL) return console.log("MongoDB Url not found!");
  if (isConnected) return console.log("Already connected to mogoDB");

  try {
    await mongoose.connect(process.env.MONGODB_URL);

    isConnected = true;
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log(error);
  }
};
