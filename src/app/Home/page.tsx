"use client";
import React from "react";
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

const page = () => {
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const data = await axios.post("http://localhost:3000/api/all-rooms", {
      roomName: "My room",
      roomDetails: "roomDetails",
      roomTags: "roomTags",
      roomCreator: "roomCreator",
      roomRepository: "roomRepository",
    });
    console.log(data);
  };

  return (
    <div className=" flex  bg-gradient-to-b from-[#000000] to-[#2e1c42] min-h-screen text-white relative">
      <div className="w-full px-10 overflow-y-auto">
        <div className="mt-10 flex justify-between items-center ">
          <h1 className="text-4xl font-bold">BroCoder</h1>
          <span>
            <UserButton afterSignOutUrl="/" />
          </span>
        </div>
        <div className="flex items-center mt-10 w-1/2">
          <Input
            type="email"
            placeholder="Search keywords"
            className="rounded-3xl border-2 placeholder:text-gray-400 mr-5"
          />
          <Button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 min-w-32">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Search
            </span>
          </Button>
        </div>
        <div className="mt-10 ">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold mb-5">Rooms</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="px-8 py-2 rounded-full bg-gradient-to-b from-[#2e1c42] to-[#5e4081] text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
                  Create Room
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] text-white bg-black min-w-[50%]">
                <DialogHeader>
                  <DialogTitle>Create Room</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-center">
                      Title
                    </Label>
                    <Input
                      id="name"
                      placeholder="Add a title"
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
                    />
                  </div>
                  <div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-center">
                        Tags
                      </Label>
                      <Input
                        id="username"
                        placeholder="Add relevant tags (Max 4 tags)"
                        className="col-span-3"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">
                        Separate tags with commas
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-center">
                      Repository
                    </Label>
                    <Input
                      id="username"
                      placeholder="Add a repository link"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" variant="outline" onClick={handleSubmit}>
                    Create Room
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid gap-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2">
            <RoomsCard />
            <RoomsCard />
            <RoomsCard />
            <RoomsCard />
            <RoomsCard />
            <RoomsCard />
            <RoomsCard />
            <RoomsCard />
            <RoomsCard />
            <RoomsCard />
            <RoomsCard />
            <RoomsCard />
            <RoomsCard />
            <RoomsCard />
            <RoomsCard />
            <RoomsCard />
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default page;
