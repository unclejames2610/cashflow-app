"use client";
import BasicButton from "@/components/BasicButton";
import SettingsCard from "@/components/settingsComponents/SettingsCard";
import SubHeader from "@/components/settingsComponents/SubHeader";
import { FaToggleOff } from "react-icons/fa6";
import React, { useState } from "react";
import ChangeEmail from "@/components/settingsComponents/ChangeEmail";
import ChangePassword from "@/components/settingsComponents/ChangePasssword";

const Settings = () => {
  const [changeEmail, setChangeEmail] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const [success, setSuccess] = useState(false);
  return (
    <div className="mx-auto flex flex-col min-h-screen bg-background gap-6 relative">
      {changeEmail && (
        <div className="w-full h-full absolute bg-black/40 z-10"></div>
      )}

      {changeEmail && (
        <div className="absolute z-20 inset-0 flex mt-4">
          <ChangeEmail
            currentEmail={currentEmail}
            changeEmail={changeEmail}
            setChangeEmail={setChangeEmail}
            setSuccess={setSuccess}
            success={success}
          />
        </div>
      )}

      {changePassword && (
        <div className="w-full h-full absolute bg-black/40 z-10"></div>
      )}

      {changePassword && (
        <div className="absolute z-20 inset-0 flex mt-4">
          <ChangePassword
            changePassword={changePassword}
            setChangePassword={setChangePassword}
            setSuccess={setSuccess}
            success={success}
          />
        </div>
      )}
      {/* header */}
      <h4 className="text-lg md:text-2xl text-primary-green font-semibold px-4 pt-4">
        Settings
      </h4>

      {/* account settings */}
      <div className="flex flex-col gap-5 px-4">
        {/* sub header */}
        <SubHeader text="Account Settings" />

        <div className="flex justify-between gap-6 items-center">
          <div className="flex flex-col text-xs md:text-sm">
            <p className="">Email Address</p>
            <div className="p-3 rounded-lg bg-gray-300 md:w-64">
              you@example.com
            </div>
          </div>
          <BasicButton
            notFull={true}
            text="Change Email"
            onClick={() => setChangeEmail(true)}
          />
        </div>
        <div className="flex justify-between gap-6 items-center">
          <SettingsCard
            text="Password"
            subText="set up permanent password to login into your account"
          />

          <BasicButton
            notFull={true}
            text="Change Password"
            onClick={() => setChangePassword(true)}
          />
        </div>
      </div>

      {/* date and time */}
      <div className="flex flex-col gap-5 px-4">
        {/* sub header */}
        <SubHeader text="Date And Time" />

        <div className="flex justify-between gap-5 items-center">
          <p className="text-xs md:text-sm">Set Time Zone To Location</p>

          <FaToggleOff className="text-4xl text-primary-green" />
        </div>
      </div>

      {/* support */}
      <div className="flex flex-col gap-5 px-4">
        {/* sub header */}
        <SubHeader text="Support" />

        <div className="flex items-center justify-between gap-6">
          <SettingsCard
            text="Log Out Of All Devices"
            subText="log out of all other active sessions besides this one"
          />

          <BasicButton notFull={true} text="Logout" />
        </div>

        <div className="flex items-center justify-between gap-6">
          <SettingsCard
            text="Delete Your Account"
            subText="permanently delete the account and remove  access from all workspaces"
          />

          <button className="text-red-600 bg-white p-3 text-sm rounded-md shadow-md lg:w-36">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
