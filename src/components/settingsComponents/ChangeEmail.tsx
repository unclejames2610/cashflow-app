import Image from "next/image";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { FaX } from "react-icons/fa6";
import correct from "../../../public/assets/correct.png";
import BasicButton from "../BasicButton";
import Loader from "../Loader";
import LoginInput from "../LoginInput";

interface ChangeEmailProps {
  changeEmail: boolean;
  setChangeEmail: Dispatch<SetStateAction<boolean>>;
  success: boolean;
  setSuccess: Dispatch<SetStateAction<boolean>>;
  currentEmail: string;
}

const ChangeEmail: FC<ChangeEmailProps> = ({
  changeEmail,
  setChangeEmail,
  success,
  setSuccess,
  currentEmail,
}) => {
  const [error, setError] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [email, setEmail] = useState("");
  const [continueEmail, setContinueEmail] = useState<boolean>(false);

  return (
    <div
      className={`mx-auto w-[90%] md:w-[50%] lg:w-[40%] h-fit gap-12 flex flex-col  z-20`}
    >
      {success === true ? (
        <div className="flex bg-white py-6 px-6 rounded-lg flex-col mx-auto gap-6 items-center w-[90%] md:w-fit">
          <div className="flex items-end w-full justify-end">
            <div
              className="p-2 rounded-full bg-gray-200 cursor-pointer"
              onClick={() => {
                setChangeEmail(false);
                setSuccess(false);
              }}
            >
              <FaX className="text-gray-600 text-[10px]" />
            </div>
          </div>
          {/* image */}
          <div className="h-16 w-16 md:w-24 md:h-24 relative">
            <Image
              src={correct}
              alt="change type"
              fill={true}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
            />
          </div>

          <div className="flex flex-col gap-4 items-center text-center">
            <h5 className="font-semibold text-lg md:text-xl text-primary-black text-center">
              Email Changed Successfully
            </h5>
          </div>
        </div>
      ) : continueEmail ? (
        <div className="flex flex-col gap-4 pt-6 pb-12 px-8 rounded-lg bg-white w-full">
          <div className="flex flex-col">
            <div className="flex w-full justify-between mb-6 gap-6">
              {/* header */}
              <h4 className=" text-lg md:text:2xl text-primary-green font-semibold">
                Change Folder
              </h4>
              <span
                className="p-2 rounded-full bg-gray-200 cursor-pointer"
                onClick={() => {
                  setChangeEmail(false);
                }}
              >
                <FaX className="text-gray-400 text-xs" />
              </span>
            </div>

            <p className="text-xs md:text-sm text-gray-400 text-center w-full -mt-4">
              Your Current Email: {currentEmail}
            </p>
          </div>

          <LoginInput
            type="password"
            label="Enter Your Password"
            placeholder="Password"
            name="secondPassword"
            value={secondPassword}
            onChange={(e) => setSecondPassword(e.target.value)}
          />

          <LoginInput
            type="email"
            label="Enter Your New Email"
            placeholder="you@example.com"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {error === true && (
            <div className="flex items-center justify-center h-full -mt-4 w-full">
              <p className="text-sm text-center text-error-red mt-4">
                An error occured, could not create folder
              </p>
            </div>
          )}

          {emptyError === true && (
            <div className="flex items-center justify-center h-full -mt-4 w-full">
              <p className="text-xs md:text-sm text-center text-error-red mt-4">
                Please, fill in all required fields
              </p>
            </div>
          )}

          {loading === true ? (
            <div className="flex items-center w-full justify-center h-fit">
              <Loader />
            </div>
          ) : (
            <div className="w-full mt-4 mx-auto flex justify-center">
              <BasicButton text="Save" onClick={() => {}} />
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4 pt-6 pb-12 px-8 rounded-lg bg-white w-full">
          <div className="flex flex-col">
            <div className="flex w-full justify-between mb-6 gap-6">
              {/* header */}
              <h4 className=" text-lg md:text:2xl text-primary-green font-semibold">
                Change Email
              </h4>
              <span
                className="p-2 rounded-full bg-gray-200 cursor-pointer"
                onClick={() => {
                  setChangeEmail(false);
                }}
              >
                <FaX className="text-gray-400 text-xs" />
              </span>
            </div>

            <p className="text-xs md:text-sm text-gray-400 text-center w-full -mt-4">
              Your Current Email: {currentEmail}
            </p>
          </div>

          <LoginInput
            type="password"
            label="Please Enter Your Password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error === true && (
            <div className="flex items-center justify-center h-full -mt-4 w-full">
              <p className="text-sm text-center text-error-red mt-4">
                An error occured, could not create folder
              </p>
            </div>
          )}

          {emptyError === true && (
            <div className="flex items-center justify-center h-full -mt-4 w-full">
              <p className="text-xs md:text-sm text-center text-error-red mt-4">
                Please, fill in all required fields
              </p>
            </div>
          )}

          {loading === true ? (
            <div className="flex items-center w-full justify-center h-fit">
              <Loader />
            </div>
          ) : (
            <div className="w-full mt-4 mx-auto flex justify-center">
              <BasicButton
                text="Continue"
                onClick={() => setContinueEmail(true)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChangeEmail;
