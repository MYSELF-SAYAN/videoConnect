import { ReactNode } from "react";

import StreamVideoProvider from "@/providers/StreamClientProvider";
import { Toaster } from "@/components/ui/toaster";

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main>
      
        <StreamVideoProvider>{children}</StreamVideoProvider>
      
        <Toaster />
    </main>
  );
};

export default RootLayout;
