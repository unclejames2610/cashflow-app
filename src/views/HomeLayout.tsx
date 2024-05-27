"use client";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";
import React, { FC, ReactNode, useState } from "react";

const HomeLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [menuActive, setmenuActive] = useState<boolean>(false);
  const [logoutActive, setLogoutActive] = useState(false);
  false;
  return (
    <div className="min-h-screen mx-auto  relative bg-white overflow-hidden">
      <div className="fixed top-0  w-full z-[70] bg-white">
        <Header setmenuActive={setmenuActive} />
      </div>

      {menuActive && (
        <div className="fixed z-[80] overflow-y-auto">
          <Menu
            logoutActive={logoutActive}
            setLogoutActive={setLogoutActive}
            setmenuActive={setmenuActive}
            pathname={pathname}
          />
        </div>
      )}
      {menuActive && (
        <div className="h-full bg-black/40 z-[60] w-screen absolute"></div>
      )}

      <div className="fixed top-16 bottom-0 h-full">
        <Sidebar
          pathname={pathname}
          logoutActive={logoutActive}
          setLogoutActive={setLogoutActive}
        />
      </div>
      <div className=" lg:ml-56 mt-16">
        <div className=" h-full">{children}</div>
      </div>
    </div>
  );
};

export default HomeLayout;
