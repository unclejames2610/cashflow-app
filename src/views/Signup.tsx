"use client";
import Button from "@/components/Button";
import LoginInput from "@/components/LoginInput";
import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import logo from "../../public/assets/logo.svg";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "@/config/firebaseConfig";
import LoaderSmall from "@/components/LoaderSmall";

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");
  const [retypePassword, setRetypePassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState(false);
  const [errorText, setErrorText] = useState<string>("");
  const auth = getAuth(app);
  const [emptyError, setEmptyError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const signUp = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPasswordError(false);
    setError(false);
    setEmptyError(false);
    setErrorText("");
    setSuccess(false);
    if (
      email.length === 0 ||
      password.length === 0 ||
      fullname.length === 0 ||
      retypePassword.length === 0
    ) {
      setEmptyError(true);
      setErrorText("Please fill in all required fields");
      setLoading(false);

      setError(false);
    } else if (password !== retypePassword) {
      setPasswordError(true);
      setErrorText("Passwords do not match");
      setLoading(false);
    } else {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          setLoading(false);
          setEmail("");
          setFullname("");
          setPassword("");
          setRetypePassword("");
          setSuccess(true);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // console.log(error.message);
          setLoading(false);
          setError(true);
          setErrorText(error.message);
          setSuccess(false);
          // ..
        });
    }
  };

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
        <div className="flex flex-col gap-2 pb-8">
          {(error === true ||
            passwordError === true ||
            emptyError === true) && (
            <p className="text-xs md:text-sm font-medium text-red-600 text-center">
              {errorText}
            </p>
          )}

          {success === true && (
            <p className="text-xs md:text-sm font-medium text-primary-green text-center">
              User Created Successfully
            </p>
          )}
          <form
            className="flex flex-col gap-4 w-full lg:w-[350px]"
            onSubmit={(e) => signUp(e)}
          >
            {/* full name */}
            <LoginInput
              name="name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Enter your name"
              type="text"
              label="Full Name"
            />

            {/* email */}
            <LoginInput
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              type="email"
              label="Email"
            />

            <LoginInput
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              type="password"
              label="Password"
            />

            <LoginInput
              name="retypePassword"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
              placeholder="Re-enter your password"
              type="password"
              label="Re-Type Password"
            />

            <Button
              text={loading ? <LoaderSmall /> : "Sign Up"}
              type="submit"
            />
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
