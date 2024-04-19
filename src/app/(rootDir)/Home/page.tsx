"use client";
import React, { use, useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RoomsCard from "@/components/RoomsCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { currentUser } from "@clerk/nextjs";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";
import { TiDeleteOutline } from "react-icons/ti";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { set } from "mongoose";

const page = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [roomName, setRoomName] = useState("");
  const [roomDetails, setRoomDetails] = useState("");
  const [roomTags, setRoomTags] = useState<string[]>([]);
  const [roomRepository, setRoomRepository] = useState("");
  const [tag, setTag] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [allRooms, setAllRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [value, setValue] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [loading, setLoading] = useState(true);
  const [callDetail, setCallDetail] = useState<Call>();
  const client = useStreamVideoClient();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const userId = user?.publicMetadata?.userId;

    if (!userId) {
      console.error("User ID not available");
      return;
    }

    try {
      const link = await createRoom();
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/my-rooms/${userId}`,
        {
          roomName: roomName,
          roomDetails: roomDetails,
          roomTags: roomTags,
          roomCreator: user?.username,
          roomRepository: roomRepository,
          roomLink: link,
        }
      );
      setRoomName("");
      setRoomDetails("");
      setRoomTags([]);
      setRoomRepository("");
      setDialogOpen(false);

      await refetch();
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };
  const refetch = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}/api/all-rooms`);
    setAllRooms(response.data);
  };
  const createRoom = async () => {
    if (!client || !user) {
      return;
    }
    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) {
        throw new Error("Call not found");
      }
      const startsAt =
        value.dateTime.toISOString() || new Date(Date.now()).toISOString();
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
        },
      });
      setCallDetail(call);
      const meetingLink = `${process.env.NEXT_PUBLIC_DOMAIN}/room/${call.id}`;
      return meetingLink;
    } catch (err) {
      console.log(err);
    }
  };
  const searching = async () => {
    //give code to filter rooms based on both tags and names
    const rooms = allRooms.filter((room: any) => {
      return (
        room.roomName.toLowerCase().includes(search.toLowerCase()) ||
        room.roomTags.includes(search.toLowerCase())
      );
    });
    
    await setFilteredRooms(rooms);
  };

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}/api/all-rooms`);
      setAllRooms(response.data);
      setFilteredRooms(response.data);
      //console.log(response.data);
      setLoading(false);
    };
    fetchRooms();
  }, []);
  useEffect(() => {
    searching();
  }, [search]);

  return (
    <div className=" flex  bg-gradient-to-b from-[#000000] to-[#2e1c42] min-h-screen text-white relative">
      <div className="w-full px-10 overflow-y-auto">
        <div className="mt-10 flex justify-between items-center ">
          <h1 className="text-4xl font-bold">BroCoder</h1>
          <span>
            <UserButton afterSignOutUrl="/" />
          </span>
        </div>
        <div className="flex items-center mt-10 md:w-1/2 sm:flex-row flex-col gap-y-2">
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search keywords"
            className="rounded-3xl border-2 placeholder:text-gray-400 mr-5"
          />
          <Button
            className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 min-w-32"
            onClick={() => searching()}
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Search
            </span>
          </Button>
        </div>
        <div className="mt-10 ">
          <div className="flex justify-between items-center flex-col md:flex-row mb-5">
            <h1 className="text-3xl font-bold mb-5">Rooms</h1>
            <Dialog open={dialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="px-8 py-2 rounded-full bg-gradient-to-b from-[#2e1c42] to-[#5e4081] text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200"
                  onClick={() => {
                    setDialogOpen(true);
                  }}
                >
                  Create Room
                </Button>
              </DialogTrigger>
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
                    <Label className=" text-green-600">
                      All details filled
                    </Label>
                  )}

                  <Button
                    variant="outline"
                    onClick={handleSubmit}
                    disabled={
                      roomName.length === 0 ||
                      roomDetails.length === 0 ||
                      roomTags.length === 0 ||
                      roomRepository.length === 0
                        ? true
                        : false
                    }
                  >
                    Create Room
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-[50vh]">
              <p>Loading...</p>
            </div>
          ) : (
            <div className="grid gap-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2">
              {filteredRooms.map((room: any) => (
                <RoomsCard room={room} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default page;
