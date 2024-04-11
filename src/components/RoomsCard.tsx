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
const RoomsCard = () => {
  return (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle>React</CardTitle>
        <CardDescription>React todo list</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-x-2">
            <Badge variant="outline" className="flex items-center justify-center bg-white text-black">Badge</Badge>
            <Badge variant="outline" className="flex items-center justify-center bg-white text-black">Badge</Badge>
            <Badge variant="outline" className="flex items-center justify-center bg-white text-black">Badge</Badge>
        </div>
        <div className="flex items-center mt-3">
           <span className="mr-5"><FaGithub/></span>
           <p>Github</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="bg-white text-black rounded-xl hover:bg-slate-400">Join Room</Button>
      </CardFooter>
    </Card>
  );
};

export default RoomsCard;
