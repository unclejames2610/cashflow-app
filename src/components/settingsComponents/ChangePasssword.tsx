import Image from "next/image";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { FaX } from "react-icons/fa6";
import correct from "../../../public/assets/correct.png";
import BasicButton from "../BasicButton";
import Loader from "../Loader";
import LoginInput from "../LoginInput";
import { MdInfoOutline } from "react-icons/md";

interface ChangePasswordProps {
  changePassword: boolean;
  setChangePassword: Dispatch<SetStateAction<boolean>>;
  success: boolean;
  setSuccess: Dispatch<SetStateAction<boolean>>;
}

const ChangePassword: FC<ChangePasswordProps> = ({
  changePassword,
  setChangePassword,
  success,
  setSuccess,
}) => {
  const [error, setError] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
                setChangePassword(false);
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
              Expense Added Successfully
            </h5>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 pt-6 pb-12 px-8 rounded-lg bg-white w-full">
          <div className="flex flex-col">
            <div className="flex w-full justify-between mb-6 gap-6">
              {/* header */}
              <h4 className=" text-lg md:text:2xl text-primary-green font-semibold">
                Change Password
              </h4>
              <span
                className="p-2 rounded-full bg-gray-200 cursor-pointer"
                onClick={() => {
                  setChangePassword(false);
                }}
              >
                <FaX className="text-gray-400 text-xs" />
              </span>
            </div>

            <div className="text-xs md:text-sm text-gray-400 w-full -mt-2 flex items-center gap-1">
              <span>
                <MdInfoOutline className="text-xl" />
              </span>

              <p>
                Use a password at least 15 letters long, or at least 8
                characters long with both letters and numbers.
              </p>
            </div>
          </div>

          <LoginInput
            type="password"
            label="Enter Your Current Password"
            placeholder="Current Password"
            name="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <LoginInput
            type="password"
            label="Enter Your New Password"
            placeholder="New Password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <LoginInput
            type="password"
            label="Confirm Your New Password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            <div className="w-full mt-4 mx-auto flex justify-center gap-8">
              <BasicButton text="Remove Password" />
              <BasicButton text="Change Password" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
