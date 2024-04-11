
import mongoose, { Schema } from "mongoose";
const allRoomsSchema = new Schema(
  {
    roomName: {
      type: String,
      required: true,
    },
    roomDetails: {
      type: String,
      required: true,
    },
    roomTags: {
      type: Array,
      required: true,
    },
    roomCreator: {
      type: String,
      required: true,
    },
    roomRepository: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const allRooms=mongoose.models.allRooms || mongoose.model("allRooms", allRoomsSchema);
export default allRooms;