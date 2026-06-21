import mongoose from "mongoose";

/**
 * Establishes a single shared connection to MongoDB.
 * Called once on server startup. We fail fast (exit the process) if the
 * connection cannot be made, because the API is useless without the DB.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
