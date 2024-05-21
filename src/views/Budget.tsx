"use client";
import AddExpense from "@/components/budgetComponents/AddExpense";
import BudgetList from "@/components/budgetComponents/BudgetList";
import BudgetTable from "@/components/budgetComponents/BudgetTable";
import CreateFolder from "@/components/budgetComponents/CreateFolder";
import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { BudgetModel } from "../../utils/types";
import { formatDateAndTime } from "../../utils/helperMethods";
import NoEntries from "@/components/NoEntries";

const Budget = () => {
  const [month, setMonth] = useState("April");
  const [createFolderActive, setCreateFolderActive] = useState(false);
  const [success, setSuccess] = useState(false);
  const [addExpense, setAddExpense] = useState(false);
  const [currentFolder, setCurrentFolder] = useState<BudgetModel | undefined>();

  const [budgetFolders, setBudgetFolders] = useState<BudgetModel[] | undefined>(
    []
  );

  const [budgetSelect, setBudgetSelect] = useState<boolean>(false);
  const [budgetName, setBudgetName] = useState<string>("");

  useEffect(() => {
    const fetchBudget = async () => {
      const querySnapshot = await getDocs(collection(db, "budgetFolder"));
      const fetchedFolders: BudgetModel[] = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.data());
        fetchedFolders.push(doc.data() as BudgetModel);
      });
      setBudgetFolders(fetchedFolders);
    };

    fetchBudget();
  }, [success]);

  console.log("success", success);
  console.log(currentFolder);
  return (
    <div className="flex flex-col min-h-screen gap-4 mx-auto  bg-background relative">
      {createFolderActive && (
        <div className="w-full h-full absolute bg-black/40 z-10"></div>
      )}

      {createFolderActive && (
        <div className="absolute z-20 inset-0 flex mt-4">
          <CreateFolder
            createFolderActive={createFolderActive}
            setCreateFolderActive={setCreateFolderActive}
            setSuccess={setSuccess}
            success={success}
          />
        </div>
      )}

      {addExpense && (
        <div className="w-full h-full absolute bg-black/40 z-10"></div>
      )}

      {addExpense && (
        <div className="absolute z-20 inset-0 flex mt-4">
          <AddExpense
            budgetName={budgetName}
            addExpense={addExpense}
            setAddExpense={setAddExpense}
            setSuccess={setSuccess}
            success={success}
            setCurrentFolder={setCurrentFolder}
          />
        </div>
      )}
      {/* header */}
      <div className="flex justify-between w-full gap-4 p-4">
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

      <div className="flex gap-6 lg:justify-between lg:flex-row flex-col lg:h-[600px] p-4">
        {/* 1st column */}
        <div className="bg-white shadow-md rounded-lg flex flex-col gap-2 px-2 py-4 lg:w-[40%] flex-grow h-full">
          <div className="flex justify-between w-full gap-6">
            <p>Budget Folder</p>
            <p
              className="text-primary-green underline cursor-pointer"
              onClick={() => setCreateFolderActive(true)}
            >
              Create Folder
            </p>
          </div>
          {budgetFolders?.length === 0 ? (
            <div className="flex py-12 justify-center items-center h-full w-full">
              <NoEntries />
            </div>
          ) : (
            budgetFolders?.map((folder, index) => (
              <BudgetList
                key={index}
                text={folder.name}
                date={new Date(folder.date).toLocaleDateString()}
                onClick={() => {
                  setBudgetName(folder.name);
                  setBudgetSelect(true);
                  setCurrentFolder(folder);
                }}
                budgetName={budgetName}
              />
            ))
          )}
        </div>

        {/* 2nd column */}
        <div className="bg-white shadow-md rounded-lg flex flex-col gap-2 px-3 py-6 lg:w-[60%] h-full">
          {budgetSelect ? (
            <BudgetTable
              addExpense={addExpense}
              setAddExpense={setAddExpense}
              currentFolder={currentFolder}
              setCurrentFolder={setCurrentFolder}
            />
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

export default Budget;
