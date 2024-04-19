"use client";
import React, { useState, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IoMdClose } from "react-icons/io";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { TiDeleteOutline } from "react-icons/ti";
import { Badge } from "./ui/badge";
import axios, { all } from "axios";
import { useUser } from "@clerk/nextjs";
import { set } from "mongoose";
import { useToast } from "@/components/ui/use-toast";
interface EditRoomDialogProps {
  open: boolean;
  setDialogOpen: (open: boolean) => void;
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
const EditRoomDialog: React.FC<EditRoomDialogProps> = ({
  open,
  setDialogOpen,
  data,
  refetch,
}): ReactNode => {
  const [roomName, setRoomName] = useState(data.roomName);
  const [roomDetails, setRoomDetails] = useState(data.roomDetails);
  const [roomTags, setRoomTags] = useState(data.roomTags);
  const [roomRepository, setRoomRepository] = useState(data.roomRepository);
  const [tag, setTag] = useState("");
  const { user } = useUser();
  const toast = useToast();
  const handleSubmit = async () => {
    try {
      const res = axios.put(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/my-rooms/${user?.publicMetadata.userId}`,
        {
          roomName: roomName,
          roomDetails: roomDetails,
          roomTags: roomTags,
          roomRepository: roomRepository,
          allRoomsID: data.allRoomsID,
        }
      );

      console.log(res);
      refetch();
      setDialogOpen(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px] text-white bg-black min-w-[50%]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Create Room</DialogTitle>
            <IoMdClose
              className=" text-2xl cursor-pointer text-white"
              onClick={() => setDialogOpen(false)}
            />
          </div>
          <DialogDescription>Fill all the details</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-center">
              Title
            </Label>
            <Input
              id="name"
              value={roomName}
              placeholder="Add a roomname"
              onChange={(e) => {
                const inputValue = e.target.value;
                if (inputValue.length <= 15) {
                  setRoomName(inputValue);
                }
              }}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-center">
              Description
            </Label>
            <Input
              id="username"
              placeholder="Add a short description"
              className="col-span-3"
              value={roomDetails}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (inputValue.length <= 100) {
                  setRoomDetails(inputValue);
                }
              }}
            />
          </div>
          <div>
            <div className="grid grid-cols-4 items-center ">
              <Label htmlFor="name" className="text-center ">
                Tags
              </Label>
              <div className="flex col-span-3 ">
                <Input
                  id="username"
                  value={tag}
                  placeholder="Add relevant tags (Max 4 tags & upto 15 characters each.)"
                  className="col-span-2"
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (inputValue.length <= 15) {
                      setTag(inputValue);
                    }
                  }}
                />
                <Button
                  variant={"outline"}
                  onClick={() => {
                    setRoomTags([...roomTags, tag]);
                    setTag("");
                  }}
                  disabled={roomTags.length === 4 ? true : false}
                >
                  Add
                </Button>
              </div>
            </div>
            {roomTags.length === 0 ? (
              <div></div>
            ) : (
              <div className="grid grid-cols-4 mt-4">
                <Label htmlFor="name" className="text-center ">
                  Added tags
                </Label>
                <div className="col-span-3 grid grid-cols-4 gap-4">
                  {roomTags.map((tag, index) => (
                    <Badge
                      variant="outline"
                      className="flex items-center justify-center bg-white text-black"
                    >
                      <p>{tag}</p>
                      <span>
                        <TiDeleteOutline
                          className=" text-2xl"
                          onClick={() => {
                            roomTags.splice(index, 1);
                            setRoomTags([...roomTags]);
                          }}
                        />
                      </span>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-center">
              Repository
            </Label>
            <Input
              id="username"
              placeholder="Add a repository link"
              className="col-span-3"
              value={roomRepository}
              onChange={(e) => {
                setRoomRepository(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter className="items-center">
          {roomName.length === 0 ||
          roomDetails.length === 0 ||
          roomTags.length === 0 ||
          roomRepository.length === 0 ? (
            <Label className=" text-red-600">Fill all details</Label>
          ) : (
            <Label className=" text-green-600">All details filled</Label>
          )}

          <Button
            variant="outline"
            onClick={() => {
              handleSubmit();
            }}
            disabled={
              roomName.length === 0 ||
              roomDetails.length === 0 ||
              roomTags.length === 0 ||
              roomRepository.length === 0
                ? true
                : false
            }
          >
            Edit Room
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditRoomDialog;
