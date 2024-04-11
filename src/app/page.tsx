"use client";
import React from "react";
import { motion } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { redirect, useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const words = [
    {
      text: "Find",
      className:
        "text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans",
    },
    {
      text: "your",
      className:
        "text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans",
    },
    {
      text: "perfect",
      className:
        "text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans",
    },
    {
      text: "pair",
      className:
        "text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans",
    },
    {
      text: "with",
      className:
        "text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans",
    },
    {
      text: "BroCoder",
      className:
        "text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="h-screen bg-neutral-950 text-white flex flex-col justify-center items-center"
    >
      <header className="w-full px-4 lg:px-6 z-10">
        <div className="container mx-auto flex justify-between items-center h-14 mt-5">
          <p className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-3xl bg-clip-text   text-center font-sans ">
            BroCoder
          </p>

          <div className="flex gap-4 md:gap-6">
            
            <Button
              variant={"link"}
              className="text-white "
              onClick={() => router.push("/sign-in")}
            >
              Sign In
            </Button>

            <Button
              variant={"link"}
              className="text-white border border-white cursor-pointer"
              onClick={() => router.push("/sign-up")}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 z-10">
        <section className="py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-5 flex flex-col items-center">
              <TypewriterEffectSmooth words={words} />
              <p className="max-w-xl text-white  md:text-xl lg:text-base xl:text-xl">
                Connect with other developers for pair programming. Collaborate
                on projects, sharpen your skills, and build your network.
              </p>
            </div>
            <div className="flex gap-4 md:gap-6">
              <Button
                className="inline-flex h-9 items-center justify-center rounded-md border text-black border-gray-200 bg-white px-4 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800  dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                onClick={() => router.push("/sign-in")}
              >
                Sign In
              </Button>
              <Button
                variant={"outline"}
                className="bg-tranparent"
                onClick={() => router.push("/sign-up")}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </section>
      </main>

      <BackgroundBeams />
    </motion.div>
  );
}
