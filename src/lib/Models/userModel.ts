import mongoose, { Schema } from "mongoose";
import { unique } from "next/dist/build/utils";
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
});
const User=mongoose.models.user || mongoose.model("user", userSchema);
export default User;
