"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { FaGithub } from "react-icons/fa";
import { Button } from "./ui/button";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import EditRoomDialog from "./EditRoomDialog";
import { useUser } from "@clerk/nextjs";
interface MyRoomsCardProps {
  data: {
    roomName: string;
    roomDetails: string;
    roomTags: string[];
    roomRepository: string;
    roomLink: string;
    allRoomsID: string;
  };
  refetch: () => void;
}
const MyRoomsCard: React.FC<MyRoomsCardProps> = ({ data,refetch }) => {
  //console.log(data);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user, isLoaded } = useUser();
  // console.log(user?.publicMetadata.userId);
  const deleteCard = async () => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/my-rooms/${user?.publicMetadata.userId}`,
        {
          data: {
            allRoomsID: data.allRoomsID,
          },
        }
      );
      refetch();
      // console.log(res);
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };
  const redirect = (url: string) => {
    window.open(url, "_blank");
  };
  return (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <p>{data.roomName}</p>
          <span className="cursor-pointer" onClick={deleteCard}>
            <MdDelete />
          </span>
        </CardTitle>
        <CardDescription>{data.roomDetails}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-x-2">
          {
            data.roomTags.map((tag) => (
              <Badge
                variant="outline"
                className="flex items-center justify-center bg-white text-black"
              >
                {tag}
              </Badge>
            ))
          }
        </div>
        <div
          className="flex items-center mt-3 cursor-pointer" onClick={() => redirect(data.roomRepository)}
        >
          <span className="mr-5">
            <FaGithub />
          </span>
          <p>Github</p>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button
          className="bg-white text-black rounded-xl hover:bg-slate-400"
          onClick={() => redirect(data.roomLink)}
        >
          Join Room
        </Button>
        <Button
          variant={"outline"}
          className="cursor-pointer rounded-xl border-2"
          onClick={() => {
            setDialogOpen(true);
          }}
        >
          Edit Room
        </Button>
        <EditRoomDialog
          open={dialogOpen}
          setDialogOpen={setDialogOpen}
          data={data}
          refetch={refetch}
        />
      </CardFooter>
    </Card>
  );
};

export default MyRoomsCard;
