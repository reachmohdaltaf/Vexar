import { StripedPattern } from "@/components/magicui/striped-pattern";
import Navbar from "@/components/Navbar";
import { GridPattern } from "@/components/ui/grid-pattern";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white max-w-screen-2xl mx-auto">
      <Navbar />
      <main className="relative w-full min-h-screen">
        <GridPattern
          width={72}
          height={56}
          className="hidden lg:block absolute top-0 left-0 w-full h-full z-0 [mask-image:radial-gradient(400px_circle_at_top_right,white,transparent)] text-primary/40"
        />
        <StripedPattern
          className="hidden lg:block absolute top-0 left-0 w-full h-full z-0 [mask-image:radial-gradient(400px_circle_at_top_right,white,transparent)] text-primary/40"
        />
        <div className="relative z-10">{children}</div>
      </main>
    </div>
  );
};

export default HomeLayout;
