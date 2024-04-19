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
    const {
      roomName,
      roomDetails,
      roomTags,
      roomCreator,
      roomRepository,
      roomLink,
    } = (await req.json()) as reqData;
    const id = req.url.split("/")[5];
    const user = await User.findOne({ _id: id });

    const allRoomsObj = new allRooms({
      roomName: roomName,
      roomDetails: roomDetails,
      roomTags: roomTags,
      roomCreator: roomCreator,
      roomRepository: roomRepository,
      roomLink: roomLink,
    });
    const all = await allRoomsObj.save();
    const ids = await all._id;
    const userRoomObj = {
      roomName: roomName,
      roomDetails: roomDetails,
      roomTags: roomTags,
      roomCreator: roomCreator,
      roomRepository: roomRepository,
      roomLink: roomLink,
      allRoomsID: all._id,
    };

    console.log(user);
    user.rooms.push(userRoomObj);
    const response = await user.save();
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

export const GET = async (req: Request, res: NextApiResponse) => {
  try {
    await connectMongoDB();
    const id = req.url.split("/")[5];
    const user = await User.findOne({ _id: id });
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error finding user:", error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

export const PUT = async (req: Request, res: NextApiResponse) => {
  try {
    await connectMongoDB();
    const { roomName, roomDetails, roomTags, roomRepository, allRoomsID } =
      await req.json();
    const id = req.url.split("/")[5];
    const user = await User.findOne({ _id: id });

    if (!user) {
      throw new Error(`User not found with ID ${id}`);
    }
    const roomIndex = user.rooms.findIndex(
      (room: any) => room.allRoomsID.toString() === allRoomsID
    );

    if (roomIndex === -1) {
      throw new Error(`Room not found with allRoomsID ${allRoomsID}`);
    }
    user.rooms[roomIndex].roomName = roomName;
    user.rooms[roomIndex].roomDetails = roomDetails;
    user.rooms[roomIndex].roomTags = roomTags;
    user.rooms[roomIndex].roomRepository = roomRepository;
    const updatedUser = await user.save();


    const allRoom = await allRooms.findOne({ _id: allRoomsID });
    allRoom.roomName = roomName;
    allRoom.roomDetails = roomDetails;
    allRoom.roomTags = roomTags;
    allRoom.roomRepository = roomRepository;
    const res2 = await allRoom.save();
    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

export const DELETE = async (req: Request, res: NextApiResponse) => {
  try {
    await connectMongoDB();
    const { allRoomsID } = await req.json();
    const id = req.url.split("/")[5];
    const user = await User.findOne({ _id: id });

    if (!user) {
      throw new Error(`User not found with ID ${id}`);
    }
    const roomIndex = user.rooms.findIndex(
      (room: any) => room.allRoomsID.toString() === allRoomsID
    );

    if (roomIndex === -1) {
      throw new Error(`Room not found with allRoomsID ${allRoomsID}`);
    }
    user.rooms.splice(roomIndex, 1);
    const updatedUser = await user.save();

    const allRoom = await allRooms.findByIdAndDelete(allRoomsID);
    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};