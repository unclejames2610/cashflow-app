"use client";
import React, { Dispatch, FC, SetStateAction } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { BudgetModel, Expense } from "../../../utils/types";

interface IIncomeDetailsPagination {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  pageCount: number | undefined;
  currentRows: BudgetModel[] | undefined;
  allUsers: BudgetModel[] | undefined;
  rowsPerPage: number;
  setRowsPerPage: Dispatch<SetStateAction<number>>;
  nextPage: number;
  setNextPage: Dispatch<SetStateAction<number>>;
  userCount: number | undefined;
}

const IncomeDetailsPagination: FC<IIncomeDetailsPagination> = ({
  currentPage,
  setCurrentPage,
  pageCount,
  currentRows,
  rowsPerPage,
  setRowsPerPage,
  nextPage,
  setNextPage,
  userCount,
  allUsers,
}) => {
  const totalUsers = (currentPage - 1) * rowsPerPage + currentRows?.length!!;
  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (totalUsers < userCount!!) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleLastPage = () => {
    setCurrentPage(pageCount!!);
  };

  return (
    <div className="flex md:flex-row flex-col justify-end gap-4 mt-4 md:items-center">
      <nav className="block">
        <ul className="flex pl-0 gap-2 rounded list-none flex-wrap text-base md:text-lg">
          <li>
            <button
              className={`p-2 rounded-full h-fit w-fit ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-800"
                  : "bg-primary-green text-white"
              }`}
              onClick={handleFirstPage}
              disabled={currentPage === 1}
            >
              <MdOutlineKeyboardDoubleArrowLeft />
            </button>
          </li>
          <li>
            <button
              className={`p-2 rounded-full h-fit w-fit ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-800"
                  : "bg-primary-green text-white"
              }`}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <MdOutlineKeyboardArrowLeft />
            </button>
          </li>
          <li>
            <button
              className={`p-2 rounded-full h-fit w-fit ${
                totalUsers === allUsers?.length
                  ? "bg-gray-200 text-gray-800"
                  : "bg-primary-green text-white"
              }`}
              onClick={handleNextPage}
              disabled={totalUsers === allUsers?.length}
            >
              <MdOutlineKeyboardArrowRight />
            </button>
          </li>
          <li>
            <button
              className={`p-2 rounded-full h-fit w-fit ${
                totalUsers === allUsers?.length
                  ? "bg-gray-200 text-gray-800"
                  : "bg-primary-green text-white"
              }`}
              onClick={handleLastPage}
              disabled={totalUsers === allUsers?.length}
            >
              <MdOutlineKeyboardDoubleArrowRight />
            </button>
          </li>
        </ul>
      </nav>
      <p className="text-xs md:text-sm text-border-custom/50">
        Showing {currentRows?.length}{" "}
        {currentRows?.length === 1 ? "entry" : "entries"}
      </p>
      <select
        className="py-2 px-4 w-fit outline-none focus:outline-none border border-line-color rounded-md text-xs md:text-sm bg-transparent text-primary-black"
        value={rowsPerPage}
        onChange={(e) => setRowsPerPage(Number(e.target.value))}
      >
        {[5, 10, 15, 20].map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      {/* {currentPage === pageCount && allUsers?.length !== userCount && (
        <p
          className="text-xs md:text-sm font-semibold text-primary-green hover:text-primary-green-hover cursor-pointer"
          onClick={() => {
            setNextPage((prevPage) => prevPage + 1);
          }}
        >
          Load More...
        </p>
      )} */}
    </div>
  );
};

export default IncomeDetailsPagination;
