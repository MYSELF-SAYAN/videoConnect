"use client";
import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import { Input } from "./ui/input";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
const Navbar: React.FC = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (inputValue.startsWith("/")) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  return (
    <div className=" bottom-20 w-full flex items-center justify-center z-40 fixed">
      <div className="flex flex-col  items-center justify-center lg:w-1/3 sm:w-1/2">
        {showSuggestions && (
          <motion.div
            className="w-full py-1 "
            animate={{ y: -20 }}
            transition={{
              type: "spring",
              stiffness: 100,
              ease: "linear",
              duration: 2,
            }}
          >
            <ul className="bg-gradient-to-b from-[#4d336b] to-[#382151] border-2 border-white rounded-xl ">
              <li className="border-b-2 border-white py-2 px-2 cursor-pointer" onClick={() => router.push("/Home")}>/Home</li>
              <li className=" py-2 px-2 cursor-pointer" onClick={() => router.push("/myrooms")}>/My rooms</li>
            </ul>
          </motion.div>
        )}
        <Input
          type="text"
          placeholder='Enter "/" to get menu'
          className="w-full border-2 rounded-xl bg-gradient-to-b from-[#33356b] to-[#382151]"
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default Navbar;
