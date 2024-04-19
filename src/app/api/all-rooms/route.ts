import connectMongoDB from "@/lib/mongodb";
import allRooms from "@/lib/Models/allRoomsModel";
import { NextApiRequest, NextApiResponse } from "next";

export const GET = async (req: Request, res: NextApiResponse) => {
  try {
    await connectMongoDB();
    //give code to get all rooms
    const rooms = await allRooms.find({});
    return new Response(JSON.stringify(rooms), { status: 200 });
  } catch (error) {
    console.error("Error finding user:", error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
