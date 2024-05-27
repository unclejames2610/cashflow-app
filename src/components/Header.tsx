"use client";
import Image from "next/image";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import logo from "../../public/assets/logo.svg";
import avatar from "../../public/assets/avatar.svg";
import { RiSearchEyeLine } from "react-icons/ri";
import { FaBars, FaRegBell } from "react-icons/fa6";

interface HeaderProps {
  setmenuActive: Dispatch<SetStateAction<boolean>>;
}

const Header: FC<HeaderProps> = ({ setmenuActive }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = () => {};
  return (
    <div className="flex bg-white w-screen justify-between items-center py-3 px-4 lg:px-16 border-b border-gray-300 h-16">
      <div className="flex items-center gap-3 lg:gap-12">
        <span
          className="cursor-pointer lg:hidden"
          onClick={() => setmenuActive(true)}
        >
          <FaBars className="text-xl text-primary-green" />
        </span>
        {/* logo */}
        <div className="relative h-8 w-20 md:h-12 md:w-36 ">
          <Image
            src={logo}
            alt="logo"
            fill={true}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
          />
        </div>

        {/* search */}
        {/* <div className="lg:flex gap-2 p-2 rounded-lg border border-gray-300 bg-white items-center hidden">
          <span>
            <RiSearchEyeLine className="text-lg text-gray-400" />
          </span>
          <input
            className="outline-none focus:outline-none w-full bg-transparent text-sm placeholder:text-border-custom/50"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            name="search"
          />
        </div> */}
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        <span className="cursor-pointer">
          <FaRegBell className="text-primary-green text-xl" />
        </span>
        {/* avatar */}
        <div className="relative h-10 w-10 md:h-12 md:w-12 rounded-full ">
          <Image
            src={avatar}
            alt="avatar"
            fill={true}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain rounded-fill"
          />
        </div>
        <p className="text-custom-black font-medium hidden lg:block">Admin</p>
      </div>
    </div>
  );
};

export default Header;
