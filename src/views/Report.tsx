"use client";
import React, { useEffect, useState } from "react";
import { RiSearchEyeLine } from "react-icons/ri";
import { MdOutlineFileDownload } from "react-icons/md";
import IncomeDetailsTable from "@/components/expenseComponents/IncomeDetailsTable";
import CategoryHistoryTable from "@/components/expenseComponents/CategoryHistory";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { BudgetModel, Expense } from "../../utils/types";
import {
  calculateBalance,
  calculateTotalExpense,
} from "../../utils/helperMethods";
import Loader from "@/components/Loader";

const Report = () => {
  const [month, setMonth] = useState("January - April");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [categoryHistory, setCategoryHistory] = useState<Expense[] | undefined>(
    []
  );
  const [income, setIncome] = useState<BudgetModel[] | undefined>([]);
  const handleSearch = () => {};
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

      const querySnapshot = await getDocs(collection(db, "income"));
      const fetchedFolders: BudgetModel[] = [];
      querySnapshot.forEach((doc) => {
        const incomeData = doc.data() as BudgetModel;
        incomeData.totalExpense = calculateTotalExpense(incomeData.expense);
        incomeData.totalBalance = calculateBalance(
          incomeData.income,
          incomeData.totalExpense
        );
        fetchedFolders.push(incomeData);
      });
      setIncome(fetchedFolders);

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
    //   });
    //   setIncome(fetchedFolders);
    // };

    fetchAll();

    // fetchIncome();
    // fetchCategories();
  }, []);

  console.log("income", income);

  if (loading) {
    return (
      <div className="flex flex-col mx-auto h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col mx-auto gap-4 p-4 bg-background">
      {/* header */}
      <div className="flex items-center justify-between gap-4 w-full">
        <h4 className="text-lg md:text-2xl text-primary-green font-semibold">
          Expense Report
        </h4>

        <div className="flex items-center lg:gap-10 gap-6">
          {/* search */}
          {/* <div className="flex gap-2 p-2 rounded-lg border border-gray-300 bg-white items-center">
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
          </div> */}

          <div className="flex items-center gap-3">
            {/* <button className="text-white bg-primary-green p-3 text-sm rounded-md shadow-md flex gap-1 items-center">
              Export <MdOutlineFileDownload className="text-white text-xl" />
            </button> */}
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
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-3">
        <IncomeDetailsTable income={income} setIncome={setIncome} />
      </div>

      <div className="bg-white rounded-lg shadow-md p-3">
        <CategoryHistoryTable
          categoryHistory={categoryHistory}
          setCategoryHistory={setCategoryHistory}
          success={success}
          setSuccess={setSuccess}
        />
      </div>
    </div>
  );
};

export default Report;
