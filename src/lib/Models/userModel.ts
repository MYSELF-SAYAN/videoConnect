import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
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
    type: Array,
    default: [],
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
