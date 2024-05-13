import Link from "next/link";
import React, { FC } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { TbClipboardText } from "react-icons/tb";
import { VscSettingsGear } from "react-icons/vsc";
const Sidebar: FC<{ pathname: string }> = ({ pathname }) => {
  const navItems1 = [
    {
      name: "Dashboard",
      path: "/home",
      icon: LuLayoutDashboard,
    },
    {
      name: "Budget",
      path: "/budget",
      icon: MdOutlineAccountBalanceWallet,
    },
    {
      name: "Report",
      path: "/report",
      icon: TbClipboardText,
    },
  ];
  return (
    <aside className="hidden lg:flex flex-col w-56 h-screen overflow-y-auto justify-between gap-6 bg-white shadow-md">
      <ul className="flex flex-col gap-2 py-4 px-5 h-full">
        {navItems1.map((item, index) => (
          <Link
            href={item.path}
            key={index}
            className={`px-4 py-2 rounded flex gap-2 cursor-pointer hover:bg-primary-green group text-primary-black hover:text-white font-semibold items-center ${
              pathname === item.path ? "bg-primary-green text-white" : ""
            }`}
          >
            <span>
              <item.icon className="text-2xl" />
            </span>
            <span className="">{item.name}</span>
          </Link>
        ))}
      </ul>

      <div className="flex flex-col gap-2 py-4 px-5 bg-red-300">
        <Link
          href="/settings"
          className={`px-4 py-2 rounded flex gap-2 cursor-pointer hover:bg-primary-green group text-primary-black hover:text-white font-semibold items-center ${
            pathname === "/settings" ? "bg-primary-green text-white" : ""
          }`}
        >
          <span>
            <VscSettingsGear className="text-2xl" />
          </span>
          <span className="">Settings</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
