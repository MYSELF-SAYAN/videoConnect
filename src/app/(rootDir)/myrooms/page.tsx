"use client";
import React, { useState, useEffect } from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import axios from 'axios';
import { set } from 'mongoose';
import Navbar from '@/components/Navbar';
import MyRoomsCard from '@/components/MyRoomsCard';
const page = () => {
    const { user, isLoaded } = useUser();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}/api/my-rooms/${user?.publicMetadata.userId}`);
            //console.log(res.data);
            setData(res.data);
            setLoading(false);
        }
        fetchData();
    }, []); 
    const refetch = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}/api/my-rooms/${user?.publicMetadata.userId}`);
        setData(res.data);
    }

    return (
        <div className=" flex  bg-gradient-to-b from-[#000000] to-[#2e1c42] min-h-screen text-white relative">
      <div className="w-full px-10 overflow-y-auto">
        <div className="mt-10 flex justify-between items-center ">
          <h1 className="text-4xl font-bold">BroCoder</h1>
          <span>
            <UserButton afterSignOutUrl="/" />
          </span>
        </div>
       
        <div className="mt-10 ">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold mb-5">My rooms</h1>
            
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-[50vh]">
              <p>Loading...</p>
            </div>
          ) : (
            <div className="grid gap-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2">
            {
                    data?.rooms?.map((room:any) => (
                        <MyRoomsCard data={room} refetch={refetch}/>
                    ))
                }
             

            </div>
          )}
        </div>
      </div>
      <Navbar />
    </div>
    );
}

export default page;
