import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Dispatch, FC, SetStateAction } from "react";
import { IoClose } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineAccountBalanceWallet, MdOutlineLogout } from "react-icons/md";
import { TbClipboardText } from "react-icons/tb";
import { VscSettingsGear } from "react-icons/vsc";

interface MenuProps {
  setmenuActive: Dispatch<SetStateAction<boolean>>;
  pathname: string | null;

  logoutActive: boolean;
  setLogoutActive: Dispatch<SetStateAction<boolean>>;
}

const Menu: FC<MenuProps> = ({
  setmenuActive,
  pathname,
  logoutActive,
  setLogoutActive,
}) => {
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

  const isActive = (path: string) => {
    return pathname && pathname.startsWith(path);
  };

  const router = useRouter();
  return (
    <aside className="flex flex-col w-56 bg-white h-screen shadow-md overflow-y-auto rounded-r-xl gap-6">
      <div className="flex items-end w-full justify-end mt-4 pr-4">
        <div
          className="p-1 rounded-full bg-[#F9F9FB] cursor-pointer"
          onClick={() => setmenuActive(false)}
        >
          <IoClose className="text-gray-600 text-lg" />
        </div>
      </div>
      <nav className="flex flex-col h-full justify-between gap-4">
        <ul className="flex flex-col h-full py-4 px-5 gap-2 ">
          {navItems1.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                router.push(item.path);
                setmenuActive(false);
              }}
              className={`px-4 py-2 rounded flex gap-2 cursor-pointer hover:bg-light-green group text-black hover:text-black font-semibold items-center ${
                isActive(item.path) ? "bg-primary-green text-white" : ""
              }`}
            >
              {" "}
              <span>
                <item.icon className="text-2xl " />
              </span>
              <span className="">{item.name}</span>
            </div>
          ))}
        </ul>
        <div className="flex flex-col gap-2 py-4 px-5 ">
          <Link
            href="/settings"
            className={`px-4 py-2 rounded flex gap-2 cursor-pointer hover:bg-light-green group text-black hover:text-black font-semibold items-center ${
              pathname === "/settings" ? "bg-primary-green text-white" : ""
            }`}
          >
            <span>
              <VscSettingsGear className="text-2xl" />
            </span>
            <span className="">Settings</span>
          </Link>

          <Link
            href="/"
            className={`px-4 py-2 rounded flex gap-2 cursor-pointer hover:bg-light-green group text-red-600 hover:text-red-600 font-semibold items-center `}
          >
            <span>
              <MdOutlineLogout className="text-2xl" />
            </span>
            <span className="">Logout</span>
          </Link>

          {/* <div
            className={`px-4 py-2 rounded flex gap-2 cursor-pointer hover:bg-light-green group text-red-600 hover:text-red-600 font-semibold items-center ${
              logoutActive === true ? "bg-primary-green text-white" : ""
            }`}
            onClick={() => setLogoutActive(!logoutActive)}
          >
            <span>
              <MdOutlineLogout className="text-2xl" />
            </span>
            <span className="">Logout</span>
          </div> */}
        </div>
      </nav>
    </aside>
  );
};

export default Menu;
