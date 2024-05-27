"use client";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { formatAmount } from "../../../utils/helperMethods";
import { Expense } from "../../../utils/types";
import NoEntries from "../NoEntries";
import CategoryHistoryPagination from "./CategoryHistoryPagination";

interface CategoryHistoryTableProps {
  categoryHistory: Expense[] | undefined;
  setCategoryHistory: Dispatch<SetStateAction<Expense[] | undefined>>;
  success: boolean;
  setSuccess: Dispatch<SetStateAction<boolean>>;
}

const CategoryHistoryTable: FC<CategoryHistoryTableProps> = ({
  categoryHistory,
  setCategoryHistory,
  setSuccess,
  success,
}) => {
  const categoryHistoryList = [
    {
      category: "Food",
      description: "Feeding",
      amount: "N10000",
    },
    {
      category: "Food",
      description: "Feeding",
      amount: "N10000",
    },
    {
      category: "Food",
      description: "Feeding",
      amount: "N10000",
    },
    {
      category: "Food",
      description: "Feeding",
      amount: "N10000",
    },
    {
      category: "Food",
      description: "Feeding",
      amount: "N10000",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const pageCount = Math.ceil(categoryHistory?.length!! / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = categoryHistory?.slice(indexOfFirstRow, indexOfLastRow);
  const [nextPage, setNextPage] = useState(1);

  // console.log(categoryHistory);

  return (
    <div className="flex flex-col gap-3">
      <h5>Category History</h5>

      {currentRows?.length!! > 0 ? (
        <div className="flex flex-col gap-3 overflow-x-auto lg:overflow-x-hidden">
          <table className="table-auto w-full ">
            <thead>
              <tr className="font-medium md:text-base text-sm text-left pb-6 md:pb-8">
                <th className="px-2 py-4">S/N</th>

                <th className="px-2 py-4">Category</th>

                <th className="px-2 py-4">Description</th>
                <th className="px-2 py-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              {currentRows?.map((category, index) => (
                <tr
                  key={index}
                  className={`border-b-[0.5px] border-gray-500 hover:bg-light-green text-sm text-primary-black cursor-pointer `}
                  //   onClick={() => handleRowClick(product._id)}
                >
                  <td className="px-2 py-4">
                    {" "}
                    {(currentPage - 1) * rowsPerPage + index + 1}
                  </td>

                  <td className="px-2 py-4">{category.category}</td>
                  <td className="px-2 py-4">{category.description}</td>
                  <td className="px-2 py-4">
                    N{formatAmount(Number(category.amount))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <CategoryHistoryPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageCount={pageCount}
            currentRows={currentRows}
            setRowsPerPage={setRowsPerPage}
            rowsPerPage={rowsPerPage}
            nextPage={nextPage}
            setNextPage={setNextPage}
            userCount={categoryHistory?.length}
            allUsers={categoryHistory}
          />
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <NoEntries />
        </div>
      )}
    </div>
  );
};

export default CategoryHistoryTable;
