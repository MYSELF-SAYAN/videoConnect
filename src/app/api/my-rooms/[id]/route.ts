import connectMongoDB from "@/lib/mongodb";
import allRooms from "@/lib/Models/allRoomsModel";
import { NextApiRequest, NextApiResponse } from "next";
import User from "@/lib/Models/userModel";
type reqData = {
  roomName: string;
  roomDetails: string;
  roomTags: string[];
  roomCreator: string;
  roomRepository: string;
  roomLink: string;
};

export const POST = async (req: Request, res: NextApiResponse) => {
  try {
    await connectMongoDB();
    const { roomName, roomDetails, roomTags, roomCreator, roomRepository,roomLink } =
      (await req.json()) as reqData;
    const id = req.url.split("/")[5];

    const user = await User.findOne({ _id: id });
    const newRoom = {
      "roomName": roomName,
      "roomDetails": roomDetails,	
      "roomTags": roomTags,
      "roomCreator": roomCreator,
      "roomRepository": roomRepository,
      "roomLink": roomLink,
    };
    
    console.log(user);
    user.rooms.push(newRoom);
    const ponse=await user.save();
      const another = new allRooms({
        roomName: roomName,
        roomDetails: roomDetails,
        roomTags: roomTags,
        roomCreator: roomCreator,
        roomRepository: roomRepository,
        roomLink: roomLink,
      });
      await another.save();

    return new Response(JSON.stringify(ponse), { status: 200 });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
