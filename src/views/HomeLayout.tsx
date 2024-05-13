"use client";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";
import React, { FC, ReactNode } from "react";

const HomeLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  return (
    <div className="min-h-screen mx-auto  relative bg-white overflow-hidden">
      <div className="fixed top-0  w-full z-[70] bg-white">
        <Header />
      </div>

      <div className="fixed top-16 bottom-0 h-full">
        <Sidebar pathname={pathname} />
      </div>
      <div className="w-full lg:ml-56 mt-16">
        <div className="w-full h-full">{children}</div>
      </div>
    </div>
  );
};

export default HomeLayout;
