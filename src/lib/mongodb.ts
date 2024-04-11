import mongoose, { Mongoose } from "mongoose";

const mongodbUri = process.env.MONGODB_URI || "";
interface MongooseConn {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}
let cached: MongooseConn = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}
const connectMongoDB = async () => {
  try {
    if (cached.conn) return cached.conn;
    cached.promise =
      cached.promise ||
      mongoose.connect(mongodbUri, {
        dbName: "brocodes",
        bufferCommands: false,
        connectTimeoutMS: 30000,
      });
    cached.conn = await cached.promise;
    console.log("Connected to MongoDB.");
    return cached.conn;
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
