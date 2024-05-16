"use client";
import BudgetList from "@/components/budgetComponents/BudgetList";
import React, { useState } from "react";

const Budget = () => {
  const [month, setMonth] = useState("April");
  return (
    <div className="flex flex-col min-h-screen gap-4 mx-auto p-4">
      {/* header */}
      <div className="flex justify-between w-full gap-4">
        <h4 className="text-lg md:text-2xl text-primary-green font-semibold">
          Budget
        </h4>

        <select
          className="border px-4 py-2 rounded-md border-gray-400 outline-none  w-fit bg-transparent focus:outline-none"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          {["April", "May", "June", "July"].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-6 lg:justify-between lg:flex-row flex-col">
        {/* 1st column */}
        <div className="bg-white shadow-md rounded-lg flex flex-col gap-2 px-2 py-4 lg:w-[40%] h-full">
          <div className="flex justify-between w-full gap-6">
            <p>Budget Folder</p>
            <p className="text-primary-green underline cursor-pointer">
              Create Folder
            </p>
          </div>

          <BudgetList text="Personal Needs" date="04/04/24" />
          <BudgetList text="Personal Needs" date="04/04/24" />
          <BudgetList text="Personal Needs" date="04/04/24" />
        </div>

        {/* 2nd column */}
        <div className="bg-white shadow-md rounded-lg flex flex-col gap-2 px-2 py-4 lg"></div>
      </div>
    </div>
  );
};

export default Budget;
