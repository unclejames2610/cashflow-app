import React, { FC, MouseEventHandler } from "react";

const BasicButton: FC<{
  text: string;
  notFull?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  deleteBtn?: boolean;
}> = ({ text, notFull, onClick, deleteBtn }) => {
  return (
    <button
      className={` ${
        deleteBtn ? "bg-red-100 text-red-600" : "bg-primary-green text-white"
      }  p-3 text-xs md:text-sm rounded-md shadow-md ${
        notFull ? "" : "w-full"
      }  lg:w-36`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default BasicButton;
