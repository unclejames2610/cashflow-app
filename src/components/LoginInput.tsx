"use client";
import React, { ChangeEventHandler, FC, HTMLInputTypeAttribute } from "react";

interface LoginInputProps {
  value: string;
  label: string;
  placeholder: string;
  name: string;
  type: HTMLInputTypeAttribute;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const LoginInput: FC<LoginInputProps> = ({
  value,
  label,
  placeholder,
  name,
  type,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-xs md:text-sm font-semibold" htmlFor="email">
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border border-gray-200 bg-gray-200 rounded-lg p-4 outline-none focus:outline-none autofill:border-none
      autofill:hover:border-none
      autofill:focus:border-none autofill:bg-transparent autofill:filter-none w-full"
      />
    </div>
  );
};

export default LoginInput;
