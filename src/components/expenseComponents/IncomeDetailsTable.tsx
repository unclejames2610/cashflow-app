"use client";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { BudgetModel } from "../../../utils/types";
import NoEntries from "../NoEntries";
import IncomeDetailsPagination from "./IncomeDetailsPagination";

interface IncomeDetailsTableProps {
  income: BudgetModel[] | undefined;
  setIncome: Dispatch<SetStateAction<BudgetModel[] | undefined>>;
}

const IncomeDetailsTable: FC<IncomeDetailsTableProps> = ({
  income,
  setIncome,
}) => {
  const incomeDetailsList = [
    {
      date: "April 2024",
      totalIncome: "N210,000",
      totalExpenses: "N110,000",
      calculatedBalance: "N100,000",
    },
    {
      date: "April 2024",
      totalIncome: "N210,000",
      totalExpenses: "N110,000",
      calculatedBalance: "N100,000",
    },
    {
      date: "April 2024",
      totalIncome: "N210,000",
      totalExpenses: "N110,000",
      calculatedBalance: "N100,000",
    },
    {
      date: "April 2024",
      totalIncome: "N210,000",
      totalExpenses: "N110,000",
      calculatedBalance: "N100,000",
    },
    {
      date: "April 2024",
      totalIncome: "N210,000",
      totalExpenses: "N110,000",
      calculatedBalance: "N100,000",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const pageCount = Math.ceil(income?.length!! / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = income?.slice(indexOfFirstRow, indexOfLastRow);
  const [nextPage, setNextPage] = useState(1);

  return (
    <div className="flex flex-col gap-3">
      <h5>Income Details</h5>
      {currentRows?.length!! > 0 ? (
        <div className=" flex flex-col gap-3 overflow-x-auto lg:overflow-x-hidden">
          <table className="table-auto w-full ">
            <thead>
              <tr className="font-medium md:text-base text-sm text-left pb-6 md:pb-8">
                <th className="px-2 py-4">S/N</th>

                <th className="px-2 py-4">Date</th>

                <th className="px-2 py-4">Total Income</th>
                <th className="px-2 py-4">Total Expenses</th>

                <th className="px-2 py-4">Calculated Balance</th>
              </tr>
            </thead>
            <tbody>
              {currentRows?.map((income, index) => (
                <tr
                  key={index}
                  className={`border-b-[0.5px] border-gray-500 hover:bg-light-green text-sm text-primary-black cursor-pointer `}
                  //   onClick={() => handleRowClick(product._id)}
                >
                  <td className="px-2 py-4">
                    {(currentPage - 1) * rowsPerPage + index + 1}
                  </td>

                  <td className="px-2 py-4">{income.name}</td>
                  <td className="px-2 py-4">{income.income}</td>
                  <td className="px-2 py-4">{income.totalExpense}</td>
                  <td className="px-2 py-4">{income.totalBalance}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <IncomeDetailsPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageCount={pageCount}
            currentRows={currentRows}
            setRowsPerPage={setRowsPerPage}
            rowsPerPage={rowsPerPage}
            nextPage={nextPage}
            setNextPage={setNextPage}
            userCount={income?.length}
            allUsers={income}
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

export default IncomeDetailsTable;
