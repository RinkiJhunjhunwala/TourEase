const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URL;

    if (!mongoUri) {
      console.error("❌ MONGODB_URI is missing in your .env file!");
      process.exit(1);
    }

    await mongoose.connect(mongoUri);

    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
