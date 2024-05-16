import React, { FC } from "react";

const BasicButton: FC<{ text: string }> = ({ text }) => {
  return (
    <button className="text-white bg-primary-green p-3 text-xs md:text-sm rounded-md shadow-md lg:w-36">
      {text}
    </button>
  );
};

export default BasicButton;
