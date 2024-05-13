"use client";
import { BarChart } from "@/components/BarChart";
import DashboardCard from "@/components/DashboardCard";
import DoughnutChart from "@/components/DoughnutChart";
import Image from "next/image";
import React, { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import ellipse from "../../public/assets/ellipse.svg";

const Dashboard = () => {
  const [month, setMonth] = useState("April");
  return (
    <div className="flex flex-col gap-4 min-h-screen mx-auto p-4 w-full">
      {/* header */}
      <div className="flex justify-between w-full gap-4">
        <h4 className="text-lg md:text-2xl text-primary-green font-semibold">
          Dashboard
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
      <div className="flex flex-col lg:flex-row gap-4 h-full">
        {/* column 1 */}
        <div className="flex flex-col gap-4 w-full lg:w-[60%]">
          <DashboardCard />

          <div className="p-6 flex flex-col bg-white shadow-md rounded-lg gap-4 h-96 ">
            {/* header */}
            <div className="flex justify-between gap-4 items-center">
              <h5 className="text-sm md:text-base">Total Balance</h5>
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 text-sm md:text-base">
                <div className="flex items-center gap-1">
                  <span className="bg-primary-green h-2.5 w-4"></span>
                  Income
                </div>
                <div className="flex items-center gap-1">
                  <span className="bg-custom-red h-2.5 w-4"></span>
                  Expense
                </div>
              </div>
            </div>
            <div className="overflow-x-auto lg:overflow-x-hidden  w-full  h-full">
              <div className="p-4 overflow-hidden  w-[500px] lg:h-full md:w-full flex items-center justify-center">
                <BarChart />
              </div>
            </div>
          </div>
        </div>

        {/* column 2 */}
        <div className="flex flex-col gap-4 w-full lg:h-[688px] lg:w-[40%]">
          <div className="flex flex-col gap-6 bg-white shadow-md rounded-lg p-6 h-full">
            <h4 className="text-lg md:text-xl">Expense Review</h4>
            <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
              <div className="overflow-x-auto lg:overflow-x-auto bg-white w-fit rounded-xl h-full lg:h-full flex items-start ">
                <div className="rounded-xl p-4 bg-white overflow-hidden h-64 md:h-[250px] sm:w-[500px] lg:w-[250px] mx-auto flex items-start">
                  <DoughnutChart />
                </div>
              </div>

              {/* legend */}
              <div className="flex flex-col justify-between lg:h-64 md:h-[250px] gap-2">
                <div className="flex items-center gap-3">
                  <span className="rounded-full h-4 w-4 bg-[#357DA0]"></span>
                  Feeding
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full h-4 w-4 bg-[#4A4086]"></span>
                  Personal Needs
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full h-4 w-4 bg-[#FF0000]"></span>
                  Woman
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full h-4 w-4 bg-[#FF7A00]"></span>
                  Transport
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 capitalize text-sm md:text-base">
              <p>
                goal: Gorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <p>
                report: Gorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
