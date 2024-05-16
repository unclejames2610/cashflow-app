import React, { FC } from "react";

const SubHeader: FC<{ text: string }> = ({ text }) => {
  return (
    <div className="text-base md:text-lg w-full border-b border-gray-400 pb-1">
      {text}
    </div>
  );
};

export default SubHeader;
