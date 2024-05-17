import React, { FC, MouseEventHandler } from "react";

const BasicButton: FC<{
  text: string;
  notFull?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}> = ({ text, notFull, onClick }) => {
  return (
    <button
      className={`text-white bg-primary-green p-3 text-xs md:text-sm rounded-md shadow-md ${
        notFull ? "" : "w-full"
      }  lg:w-36`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default BasicButton;
