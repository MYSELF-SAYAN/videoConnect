import connectMongoDB from "@/lib/mongodb";
import allRooms from "@/lib/Models/allRoomsModel";
import { NextApiRequest, NextApiResponse } from "next";
type reqData ={
  roomName: string;
  roomDetails: string;
  roomTags: string[];
  roomCreator: string;
  roomRepository: string;
};

export const POST = async (req: Request, res: NextApiResponse) => {
  try {
    await connectMongoDB();
    const { roomName, roomDetails, roomTags, roomCreator, roomRepository } = await req.json();
    console.log("Request Body:", req.body);
    console.log("roomName:", roomName);
    console.log("roomDetails:", roomDetails);
    console.log("roomTags:", roomTags);
    console.log("roomCreator:", roomCreator);
    console.log("roomRepository:", roomRepository);
    const newRoom = new allRooms({
      roomName,
      roomDetails,
      roomTags,
      roomCreator,
      roomRepository,
    });
    await newRoom.save();

    return new Response("User created successfully", { status: 200 });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
