import mongoose, { Schema, Document } from "mongoose";

// Interface representing a single room object
interface Room {
  roomName: string;
  roomDetails: string;
  roomTags: string[];
  roomCreator: string;
  roomRepository: string;
  roomLink: string;
  allRoomsID: string;
}

// Interface representing the User document (extends mongoose.Document)
interface UserDocument extends Document {
  clerkId: string;
  userName: string;
  email: string;
  rooms: Room[]; // Array of Room objects
}

// Define the schema for the User collection
const userSchema = new Schema<UserDocument>({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  rooms: {
    type: [
      {
        roomName: { type: String, required: true },
        roomDetails: { type: String, required: true },
        roomTags: { type: [String], required: true },
        roomCreator: { type: String, required: true },
        roomRepository: { type: String, required: true },
        roomLink: { type: String, required: true },
        allRoomsID: { type: String, required: true },
      },
    ],
    default: [],
  },
});

// Define and export the User model
const User =
  mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);

export default User;
