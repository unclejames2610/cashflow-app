"use client";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { RiSearchEyeLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { BudgetModel } from "../../../utils/types";
import { formatAmount, formatTime } from "../../../utils/helperMethods";
import NoEntries from "../NoEntries";

interface BudgetTableProps {
  addExpense: boolean;
  setAddExpense: Dispatch<SetStateAction<boolean>>;
  currentFolder: BudgetModel | undefined;
  setCurrentFolder: Dispatch<SetStateAction<BudgetModel | undefined>>;
}

const BudgetTable: FC<BudgetTableProps> = ({
  addExpense,
  setAddExpense,
  currentFolder,
  setCurrentFolder,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleSearch = () => {};

  const budgetItems = [
    {
      category: "Food",
      date: "04/04/24",
      description: "Moimoi and Egg",
      amount: "N2500",
    },
    {
      category: "Food",
      date: "04/04/24",
      description: "Moimoi and Egg",
      amount: "N2500",
    },
    {
      category: "Food",
      date: "04/04/24",
      description: "Moimoi and Egg",
      amount: "N2500",
    },
    {
      category: "Food",
      date: "04/04/24",
      description: "Moimoi and Egg",
      amount: "N2500",
    },
    {
      category: "Food",
      date: "04/04/24",
      description: "Moimoi and Egg",
      amount: "N2500",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between gap-4 items-center">
        {/* search */}
        <div className="flex gap-2 p-2 rounded-lg border border-gray-300 bg-white items-center">
          <span>
            <RiSearchEyeLine className="text-lg text-gray-400" />
          </span>
          <input
            className="outline-none focus:outline-none w-full bg-transparent text-sm "
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            name="search"
          />
        </div>

        <button
          className="text-white bg-primary-green p-3 text-sm rounded-md shadow-md"
          onClick={() => setAddExpense(true)}
        >
          Add Expenses
        </button>
      </div>

      <div className="items-center flex gap-4 justify-end w-full">
        <div className="flex items-center gap-2 text-primary-green text-sm cursor-pointer">
          <span className="text-xl">
            <MdOutlineEdit />
          </span>
          <p>Edit</p>
        </div>
        <div className="flex items-center gap-2 text-gray-400 text-sm cursor-pointer">
          <span className="text-lg">
            <FiTrash2 />
          </span>
          <p>Delete</p>
        </div>
      </div>

      {/* table */}
      {currentFolder?.expense?.length!! > 0 ? (
        <div className="flex flex-col gap-3">
          <div className="overflow-x-auto lg:overflow-x-hidden">
            <table className="table-auto w-full ">
              <thead>
                <tr className="font-medium md:text-base text-sm text-left pb-6 md:pb-8">
                  <th className="px-2 py-4">S/N</th>
                  <th className="px-2 py-4">Category</th>

                  <th className="px-2 py-4">Date</th>

                  <th className="px-2 py-4">Description</th>
                  <th className="px-2 py-4">Amount</th>
                </tr>
              </thead>
              <tbody>
                {currentFolder?.expense?.map((budget, index) => (
                  <tr
                    key={index}
                    className={`border-b-[0.5px] border-gray-500 hover:bg-light-green text-sm text-primary-black cursor-pointer `}
                    //   onClick={() => handleRowClick(product._id)}
                  >
                    <td className="px-2 py-4">{index + 1}</td>

                    <td className="px-2 py-4">{budget.category}</td>
                    <td className="px-2 py-4">
                      {new Date(budget.date).toLocaleDateString()}
                    </td>
                    <td className="px-2 py-4">{budget.description}</td>
                    <td className="px-2 py-4">{budget.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex gap-1 items-center justify-center w-full text-xs md:text-sm">
            {"<"} <span>1</span> <span>2</span> <span>3</span> <span>4</span>
            <span>5</span>
            {">"}
          </div>

          <p className="text-xs md:text-sm">
            Total Planned Expense For The Month N
            {formatAmount(Number(currentFolder?.income))}
          </p>
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <NoEntries />
        </div>
      )}
    </div>
  );
};

export default BudgetTable;
