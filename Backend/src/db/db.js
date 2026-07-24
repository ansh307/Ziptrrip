const mongoose = require("mongoose");

const connectDB = async (req, res) => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing in environment variables");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Database connected successfully");
  } catch (e) {
    console.error("DB connection error:", e.message);
    process.exit(1); // exit app if DB fails
  }
};

module.exports = connectDB;
