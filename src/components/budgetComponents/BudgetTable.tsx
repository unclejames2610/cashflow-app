"use client";
import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useState,
} from "react";
import { RiSearchEyeLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { BudgetModel, Expense } from "../../../utils/types";
import { formatAmount, formatTime } from "../../../utils/helperMethods";
import NoEntries from "../NoEntries";
import BudgetPagination from "./BudgetPagination";

interface BudgetTableProps {
  addExpense: boolean;
  setAddExpense: Dispatch<SetStateAction<boolean>>;
  currentFolder: BudgetModel | undefined;
  setCurrentFolder: Dispatch<SetStateAction<BudgetModel | undefined>>;
  currentExpense: Expense | undefined;
  setCurrentExpense: Dispatch<SetStateAction<Expense | undefined>>;
  setEditExpense: Dispatch<SetStateAction<boolean>>;
}

const BudgetTable: FC<BudgetTableProps> = ({
  addExpense,
  setAddExpense,
  currentFolder,
  setCurrentFolder,
  setEditExpense,
  setCurrentExpense,
  currentExpense,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset current page when searching
  };

  // logic to search for user by name, mail or phone number
  const filteredData = currentFolder?.expense?.filter(
    (expense) =>
      expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const pageCount = Math.ceil(filteredData?.length!! / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData?.slice(indexOfFirstRow, indexOfLastRow);
  const [nextPage, setNextPage] = useState(1);
  // const startIndex = (currentPage - 1) * rowsPerPage;

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
    <div className="flex flex-col gap-6 h-full">
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

      {/* <div className="items-center flex gap-4 justify-end w-full">
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
      </div> */}

      {/* table */}
      {currentRows?.length!! > 0 ? (
        <div className="flex flex-col gap-3 h-full overflow-auto">
          <div className="overflow-auto lg:overflow-x-hidden">
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
                {currentRows?.reverse()?.map((budget, index) => (
                  <tr
                    key={index}
                    className={`border-b-[0.5px] border-gray-500 hover:bg-primary-green/15 text-sm text-primary-black cursor-pointer `}
                    onClick={() => {
                      setEditExpense(true);
                      setCurrentExpense(budget);
                    }}
                  >
                    <td className="px-2 py-4">
                      {(currentPage - 1) * rowsPerPage + index + 1}
                    </td>

                    <td className="px-2 py-4">{budget.category}</td>
                    <td className="px-2 py-4">
                      {new Date(budget.date).toLocaleDateString()}
                    </td>
                    <td className="px-2 py-4">{budget.description}</td>
                    <td className="px-2 py-4">
                      {formatAmount(Number(budget.amount))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <BudgetPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageCount={pageCount}
            currentRows={currentRows}
            setRowsPerPage={setRowsPerPage}
            rowsPerPage={rowsPerPage}
            nextPage={nextPage}
            setNextPage={setNextPage}
            userCount={filteredData?.length}
            allUsers={filteredData}
          />

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
