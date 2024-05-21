import React from "react";
import { TbZoomQuestion } from "react-icons/tb";
import { IoDocuments } from "react-icons/io5";
import { FaFileCircleQuestion } from "react-icons/fa6";

const NoEntries = () => {
  return (
    <div className="flex flex-col mx-auto h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-2 p-4">
        <span className="bg-primary-green/15 p-8 flex items-center flex-col rounded-full ">
          {/* <IoDocuments className="text-6xl text-primary" />
          <TbZoomQuestion className="text-4xl text-primary absolute bottom-0 -right-1 z-10" /> */}

          <FaFileCircleQuestion className="text-5xl md:text-7xl text-primary-green" />
        </span>

        <p className="text-center text-sm md:text-lg">No entries found</p>
      </div>
    </div>
  );
};

export default NoEntries;
