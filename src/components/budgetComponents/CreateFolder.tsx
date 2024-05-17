import Image from "next/image";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { FaX } from "react-icons/fa6";
import correct from "../../../public/assets/correct.png";
import BasicButton from "../BasicButton";
import Loader from "../Loader";
import LoginInput from "../LoginInput";

interface CreateFolderProps {
  createFolderActive: boolean;
  setCreateFolderActive: Dispatch<SetStateAction<boolean>>;
  success: boolean;
  setSuccess: Dispatch<SetStateAction<boolean>>;
}

const CreateFolder: FC<CreateFolderProps> = ({
  createFolderActive,
  setCreateFolderActive,
  success,
  setSuccess,
}) => {
  const [error, setError] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [folderName, setFolderName] = useState<string>("");
  const [income, setIncome] = useState<string>("");
  const [month, setMonth] = useState<string>("");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
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
                setCreateFolderActive(false);
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
              Folder Created Successfully
            </h5>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 pt-6 pb-12 px-8 rounded-lg bg-white w-full">
          <div className="flex w-full justify-between mb-6 gap-6">
            {/* header */}
            <h4 className=" text-lg md:text:2xl text-primary-green font-semibold">
              Create Folder
            </h4>
            <span
              className="p-2 rounded-full bg-gray-200 cursor-pointer"
              onClick={() => {
                setCreateFolderActive(false);
              }}
            >
              <FaX className="text-gray-400 text-xs" />
            </span>
          </div>

          <LoginInput
            type="text"
            label="Folder Name"
            placeholder="Enter Folder Name"
            name="folder"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />

          <LoginInput
            type="text"
            label="Total Income"
            placeholder="Enter Total Income"
            name="income"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            pattern="[0-9]*"
          />

          <div className="flex flex-col gap-1 w-full">
            <label className="text-xs md:text-sm font-medium" htmlFor="month">
              Select Month
            </label>
            <select
              id="month"
              name="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="border border-gray-200 bg-gray-200 rounded-lg p-4 outline-none focus:outline-none autofill:border-none
      autofill:hover:border-none
      autofill:focus:border-none autofill:bg-transparent autofill:filter-none w-full"
            >
              {months.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

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
              <BasicButton text="Create" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreateFolder;
