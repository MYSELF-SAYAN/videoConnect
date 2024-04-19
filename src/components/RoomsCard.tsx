import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { FaGithub } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";
interface RoomsCardProps {
  room: {
    roomName: string;
    roomDetails: string;
    roomTags: string[];
    roomLink: string;
    roomRepository: string;
    roomCreator: string;
  };
}

const RoomsCard: React.FC<RoomsCardProps> = ({ room }) => {
 // console.log(room)
  const redirect = (link: string) => () => {
    window.open(link, "_blank");
  }
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  }
  return (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-end justify-between">
          <p>{room.roomName}</p>
          <span className="cursor-pointer" onClick={(event: React.MouseEvent<HTMLSpanElement>) => copyToClipboard(room.roomLink)}><FaCopy/></span>
        </CardTitle>
        <CardDescription>{room.roomDetails}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-x-2">
          {
            // Displaying the tags
            room.roomTags.map((tag) => (
              <Badge
                variant="outline"
                className="flex items-center justify-center bg-white text-black"
              >
                {tag}
              </Badge>
            ))
          }
          
        </div>
        <div className="flex items-center mt-3 cursor-pointer" onClick={redirect(room.roomRepository)}>
          <span className="mr-5">
            <FaGithub />
          </span>
          <p>Github</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="bg-white text-black rounded-xl hover:bg-slate-400" onClick={redirect(room.roomLink)}>
          Join Room
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoomsCard;
