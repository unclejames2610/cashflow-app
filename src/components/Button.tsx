import Link from "next/link";
import React, {
  ButtonHTMLAttributes,
  FC,
  MouseEventHandler,
  ReactNode,
} from "react";

interface ButtonProps {
  text: string | ReactNode;
  link?: string;
  type?: "button" | "reset" | "submit" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({ text, link, type, onClick, disabled }) => {
  if (link) {
    return (
      <Link href={link} className="w-full">
        <button
          className=" border text-white bg-primary-green cursor-pointer hover:bg-primary-green-hover  text-center rounded-lg border-primary-green w-full  transition duration-500 text-base font-semibold h-11 disabled:cursor-not-allowed disabled:bg-primary-green/70 disabled:border-primary-green/70 hover:border-primary-green-hover"
          type={type}
          onClick={onClick}
          disabled={disabled}
        >
          {text}
        </button>
      </Link>
    );
  } else
    return (
      <button
        className=" border text-white bg-primary-green cursor-pointer hover:bg-primary-green-hover  text-center rounded-lg border-primary-green w-full   transition duration-500 text-base font-semibold h-11 disabled:cursor-not-allowed disabled:bg-primary-green/70 disabled:border-primary-green/70 hover:border-primary-green-hover"
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    );
};

export default Button;
