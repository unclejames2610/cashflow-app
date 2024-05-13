"use client";
import Button from "@/components/Button";
import LoginInput from "@/components/LoginInput";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "../../public/assets/logo.svg";

const Signup = () => {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [fullname, setFullname] = useState<string | undefined>();
  const [retypePassword, setRetypePassword] = useState<string | undefined>();
  return (
    <div className="flex lg:justify-between h-screen mx-auto lg:items-center">
      {/* column one */}
      <div className="lg:flex flex-col items-center w-[50%] hidden h-full gap-8">
        <div className="flex flex-col items-center gap-1 py-8">
          {/* logo */}
          <div className="relative h-12 w-28 md:h-12 md:w-36 ">
            <Image
              src={logo}
              alt="logo"
              fill={true}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
            />
          </div>

          <p className="font-medium text-black uppercase text-lg md:text-xl">
            your guide to financial freedom
          </p>
        </div>
        <div className="h-[100%] w-full bg-cover bg-bgImage bg-no-repeat"></div>
        {/* <div className="relative h-full w-full md:h-full md:w-full ">
        <Image
          src={loginImage}
          alt="logo"
          fill={true}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain"
        />
      </div> */}
      </div>

      {/* column two */}
      <div className="flex flex-col w-full lg:w-[50%] items-center gap-8 p-4">
        <div className="flex flex-col items-center gap-1 py-8 lg:hidden w-full">
          {/* logo */}
          <div className="relative h-12 w-28 md:h-12 md:w-36 ">
            <Image
              src={logo}
              alt="logo"
              fill={true}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
            />
          </div>

          <p className="font-medium text-black uppercase text-base md:text-xl text-center">
            your guide to financial freedom
          </p>
        </div>
        <h4 className="font-semibold text-lg md:text-2xl text-primary-green">
          Create Account
        </h4>
        <div className="flex flex-col gap-2">
          <form className="flex flex-col gap-4 w-full lg:w-[350px]">
            {/* full name */}
            <LoginInput
              name="fullName"
              value={fullname!!}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Enter your name"
              type="text"
              label="Full Name"
            />

            {/* email */}
            <LoginInput
              name="email"
              value={email!!}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              type="email"
              label="Email"
            />

            <LoginInput
              name="password"
              value={password!!}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              type="password"
              label="Password"
            />

            <LoginInput
              name="retypePassword"
              value={retypePassword!!}
              onChange={(e) => setRetypePassword(e.target.value)}
              placeholder="Re-enter your password"
              type="password"
              label="Re-Type Password"
            />

            <Button text="Sign Up" />
          </form>

          <div className="text-gray-500 ">
            Already Have An Account?{" "}
            <Link href="/" className="text-primary-green hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
