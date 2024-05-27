"use client";

import BarChart from "@/components/BarChart";
import DashboardCard from "@/components/DashboardCard";
import DoughnutChart from "@/components/DoughnutChart";
import CategoryHistoryPagination from "@/components/expenseComponents/CategoryHistoryPagination";
import Loader from "@/components/Loader";
import NoEntries from "@/components/NoEntries";
import { db } from "@/config/firebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import ellipse from "../../public/assets/ellipse.svg";
import {
  calculateBalance,
  calculateTotalExpense,
  formatAmount,
  formatMonthAndYear,
} from "../../utils/helperMethods";
import { BudgetModel, Expense } from "../../utils/types";

const Dashboard = () => {
  const [month, setMonth] = useState("April");
  const [categoryHistory, setCategoryHistory] = useState<Expense[] | undefined>(
    []
  );
  const [budgetFolders, setBudgetFolders] = useState<BudgetModel[] | undefined>(
    []
  );
  const [doughnutBudget, setDoughnutBudget] = useState<
    BudgetModel[] | undefined
  >([]);
  const [income, setIncome] = useState<BudgetModel[] | undefined>([]);

  const [currentBalance, setCurrentBalance] = useState("");
  const [totalIncome, setTotalIncome] = useState("");
  const [totalSpending, setTotalSpending] = useState("");
  const [totalSavings, setTotalSavings] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const docRef = doc(db, "category", "allCategories");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setCategoryHistory(docSnap.data().expense.reverse() as Expense[]);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }

      const querySnapshot = await getDocs(collection(db, "budgetFolder"));
      const fetchedFolders: BudgetModel[] = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.data());
        fetchedFolders.push(doc.data() as BudgetModel);
      });

      const splitFour = fetchedFolders.slice(0, 4);
      setDoughnutBudget(splitFour);

      const splitFolders = fetchedFolders.slice(0, 3);
      setBudgetFolders(splitFolders);

      const querySnapshot2 = await getDocs(collection(db, "income"));
      const fetchedFolders2: BudgetModel[] = [];
      querySnapshot2.forEach((doc) => {
        const incomeData = doc.data() as BudgetModel;
        incomeData.totalExpense = calculateTotalExpense(incomeData.expense);
        incomeData.totalBalance = calculateBalance(
          incomeData.income,
          incomeData.totalExpense
        );
        fetchedFolders2.push(incomeData);
        const slicedFolders = fetchedFolders2.slice(0, 12);
        setIncome(slicedFolders);

        let totalIncome = 0;
        let totalExpense = 0;
        let totalBalance = 0;

        fetchedFolders2.forEach((folder) => {
          totalIncome += parseFloat(folder.income);
          totalExpense += parseFloat(folder.totalExpense || "0"); // handle missing totalExpense
          totalBalance += parseFloat(folder.totalBalance || "0"); // handle missing totalBalance
        });

        setTotalIncome(totalIncome.toString());
        setTotalSpending(totalExpense.toString());
        setTotalSavings((totalIncome - totalExpense).toString()); // calculate savings
        setCurrentBalance(totalBalance.toString());
      });

      setLoading(false);
    };

    // const fetchCategories = async () => {
    //   const docRef = doc(db, "category", "allCategories");
    //   const docSnap = await getDoc(docRef);

    //   if (docSnap.exists()) {
    //     console.log("Document data:", docSnap.data());
    //     setCategoryHistory(docSnap.data().expense.reverse() as Expense[]);
    //   } else {
    //     // docSnap.data() will be undefined in this case
    //     console.log("No such document!");
    //   }
    // };

    // const fetchBudget = async () => {
    //   const querySnapshot = await getDocs(collection(db, "budgetFolder"));
    //   const fetchedFolders: BudgetModel[] = [];
    //   querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     // console.log(doc.data());
    //     fetchedFolders.push(doc.data() as BudgetModel);
    //   });

    //   const splitFour = fetchedFolders.slice(0, 4);
    //   setDoughnutBudget(splitFour);

    //   const splitFolders = fetchedFolders.slice(0, 3);
    //   setBudgetFolders(splitFolders);
    // };

    // const fetchIncome = async () => {
    //   const querySnapshot = await getDocs(collection(db, "income"));
    //   const fetchedFolders: BudgetModel[] = [];
    //   querySnapshot.forEach((doc) => {
    //     const incomeData = doc.data() as BudgetModel;
    //     incomeData.totalExpense = calculateTotalExpense(incomeData.expense);
    //     incomeData.totalBalance = calculateBalance(
    //       incomeData.income,
    //       incomeData.totalExpense
    //     );
    //     fetchedFolders.push(incomeData);
    //     const slicedFolders = fetchedFolders.slice(0, 12);
    //     setIncome(slicedFolders);

    //     let totalIncome = 0;
    //     let totalExpense = 0;
    //     let totalBalance = 0;

    //     fetchedFolders.forEach((folder) => {
    //       totalIncome += parseFloat(folder.income);
    //       totalExpense += parseFloat(folder.totalExpense || "0"); // handle missing totalExpense
    //       totalBalance += parseFloat(folder.totalBalance || "0"); // handle missing totalBalance
    //     });

    //     setTotalIncome(totalIncome.toString());
    //     setTotalSpending(totalExpense.toString());
    //     setTotalSavings((totalIncome - totalExpense).toString()); // calculate savings
    //     setCurrentBalance(totalBalance.toString());
    //   });
    // };

    fetchAll();

    // fetchIncome();

    // fetchCategories();
    // fetchBudget();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const pageCount = Math.ceil(categoryHistory?.length!! / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = categoryHistory?.slice(0, 3);
  const [nextPage, setNextPage] = useState(1);

  const legendColor = ["#357DA0", "#4A4086", "#FF0000", "#FF7A00"];

  if (loading) {
    return (
      <div className="flex flex-col mx-auto h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 min-h-screen mx-auto p-4 w-full">
      {/* header */}
      <div className="flex justify-between w-full gap-4">
        <h4 className="text-lg md:text-2xl text-primary-green font-semibold">
          Dashboard
        </h4>

        {/* <select
          className="border px-4 py-2 rounded-md border-gray-400 outline-none  w-fit bg-transparent focus:outline-none"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          {["April", "May", "June", "July"].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select> */}
      </div>
      <div className="flex flex-col lg:flex-row gap-4 h-full">
        {/* column 1 */}
        <div className="flex flex-col gap-4 w-full lg:w-[60%]">
          <DashboardCard
            currentBalance={currentBalance}
            totalIncome={totalIncome}
            totalSavings={totalSavings}
            totalSpending={totalSpending}
          />

          <div className="p-6 flex flex-col bg-white shadow-md rounded-lg gap-4 lg:h-96 ">
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
                <BarChart incomeData={income!!} />
              </div>
            </div>
          </div>
        </div>

        {/* column 2 */}
        <div className="flex flex-col gap-4 w-full lg:h-[688px] lg:w-[40%]">
          <div className="flex flex-col gap-6 bg-white shadow-md rounded-lg justify-between p-6 h-full">
            <div className="flex flex-col gap-4">
              <h4 className="text-lg md:text-xl">Expense Review</h4>
              <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
                <div className="overflow-x-auto lg:overflow-x-auto w-full  h-full lg:h-full flex items-start  ">
                  <div className=" p-4 overflow-hidden h-64 w-fit md:h-[250px] sm:w-[500px] lg:w-[250px] flex items-start ">
                    <DoughnutChart budgetData={doughnutBudget!!} />
                  </div>
                </div>

                {/* legend */}
                <div className="flex flex-col justify-between lg:h-64 md:h-[250px] gap-2 w-full">
                  {doughnutBudget?.map((item, index) => (
                    <div className="flex items-center gap-3" key={index}>
                      <span
                        className={`rounded-full h-4 w-4 bg-[${legendColor[index]}]`}
                      ></span>
                      {item.name}
                    </div>
                  ))}
                  <div className=" items-center gap-3 hidden">
                    <span className="rounded-full h-4 w-4 bg-[#357DA0]"></span>
                    Feeding
                  </div>
                  <div className=" items-center gap-3 hidden">
                    <span className="rounded-full h-4 w-4 bg-[#4A4086]"></span>
                    Personal Needs
                  </div>
                  <div className=" items-center gap-3 hidden">
                    <span className="rounded-full h-4 w-4 bg-[#FF0000]"></span>
                    Woman
                  </div>
                  <div className=" items-center gap-3 hidden">
                    <span className="rounded-full h-4 w-4 bg-[#FF7A00]"></span>
                    Transport
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 capitalize text-sm md:text-base mt-12">
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

      {/* last row */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/*budget  */}
        <div className="bg-white shadow-md rounded-lg p-4 lg:w-[60%]">
          {/* header */}
          <div className="flex justify-between gap-5 items-center my-4">
            <h4 className="font-medium text-lg md:text-xl">Budget Folder</h4>

            <p className="text-primary-green underline text-sm ">View All</p>
          </div>

          {budgetFolders?.length!! > 0 ? (
            budgetFolders?.map((budget, index) => (
              <div
                className="flex justify-between gap-5 items-center border-b border-black py-4"
                key={index}
              >
                <p className="">{budget.name}</p>

                <p className=" ">{new Date(budget.date).toDateString()}</p>
              </div>
            ))
          ) : (
            <div className="flex h-full w-full items-center justify-center py-8">
              <NoEntries />
            </div>
          )}
        </div>

        {/* category */}
        <div className="bg-white shadow-md rounded-lg p-4 lg:w-[40%] gap-4 flex flex-col">
          <h4 className="font-medium text-lg md:text-xl ">Category History</h4>

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
              {/* <CategoryHistoryPagination
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
              /> */}
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <NoEntries />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
