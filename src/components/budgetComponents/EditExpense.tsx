"use client";
import { db } from "@/config/firebaseConfig";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { FaX } from "react-icons/fa6";
import correct from "../../../public/assets/correct.png";
import { BudgetModel, Expense } from "../../../utils/types";
import BasicButton from "../BasicButton";
import Loader from "../Loader";
import LoginInput from "../LoginInput";

interface EditExpenseProps {
  editExpense: boolean;
  setEditExpense: Dispatch<SetStateAction<boolean>>;
  success: boolean;
  setSuccess: Dispatch<SetStateAction<boolean>>;
  budgetName: string;
  setCurrentFolder: Dispatch<SetStateAction<BudgetModel | undefined>>;
  currentFolder: BudgetModel | undefined;
  setCurrentExpense: Dispatch<SetStateAction<Expense | undefined>>;
  currentExpense: Expense | undefined;
}

const EditExpense: FC<EditExpenseProps> = ({
  editExpense,
  setEditExpense,
  success,
  setSuccess,
  budgetName,
  setCurrentFolder,
  currentFolder,
  currentExpense,
  setCurrentExpense,
}) => {
  const [error, setError] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(currentExpense?.category);
  const [amount, setAmount] = useState(currentExpense?.amount);
  const [description, setDescription] = useState(currentExpense?.description);
  const [date, setDate] = useState(currentExpense?.description);

  //   console.log(currentExpense);

  const onSubmit = async () => {
    setLoading(true);
    setError(false);
    setEmptyError(false);
    if (
      category?.length === 0 ||
      amount?.length === 0 ||
      description?.length === 0 ||
      date?.length === 0
    ) {
      setEmptyError(true);
    } else {
      try {
        const docRef = doc(db, "budgetFolder", budgetName);
        const res = await getDoc(docRef);
        const updatedExpense = {
          id: currentExpense?.id,
          category: category,
          amount: amount,
          description: description,
          date: date,
        };
        if (res.exists()) {
          const folderData = res.data() as BudgetModel;
          const expenseIndex = folderData?.expense?.findIndex(
            (expense) => expense.id === currentExpense?.id // Match the expense ID
          );
          if (folderData?.expense) {
            const filteredExpenses = folderData.expense.filter(
              (expense) => expense.id !== currentExpense?.id // Exclude the expense to update
            );

            // Update the document with the filtered array and the updated expense
            await updateDoc(docRef, {
              expense: [...filteredExpenses, updatedExpense],
            });
          } else {
            console.error("Expense to update not found");
          }
          //   await updateDoc(docRef, {
          //     expense: arrayUnion({
          //       category: category,
          //       amount: amount,
          //       description: description,
          //       date: date,
          //     }),
          //   });
          setSuccess(true);

          // After successful update, fetch the updated document to ensure currentFolder reflects the change
          const updatedDocSnap = await getDoc(docRef);
          const updatedFolderData = updatedDocSnap.data() as BudgetModel;
          setCurrentFolder(updatedFolderData);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  const onDelete = async () => {
    setLoading(true);
    setError(false);
    try {
      const docRef = doc(db, "budgetFolder", budgetName);

      // Fetch the current folder data
      const folderSnap = await getDoc(docRef);
      const folderData = folderSnap.data() as BudgetModel;

      if (folderData?.expense) {
        const filteredExpenses = folderData.expense.filter(
          (expense) => expense.id !== currentExpense?.id // Exclude the expense to delete
        );

        // Update the document with the filtered array (excluding the expense)
        await updateDoc(docRef, {
          expense: filteredExpenses,
        });
        setSuccess(true);

        // After successful update, fetch the updated document to ensure currentFolder reflects the change
        const updatedDocSnap = await getDoc(docRef);
        const updatedFolderData = updatedDocSnap.data() as BudgetModel;
        setCurrentFolder(updatedFolderData);
        setLoading(false);
      } else {
        console.error("Expense data not found in the document");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div
      className={`mx-auto w-[90%] md:w-[50%] lg:w-[40%] h-fit gap-12 flex flex-col  z-20`}
    >
      {success === true ? (
        <div className="flex bg-white py-6 px-6 rounded-lg flex-col mx-auto gap-6 items-center w-[90%] md:w-fit">
          <div className="flex items-end w-full justify-end">
            <div
              className="p-2 rounded-full bg-gray-200 cursor-pointer"
              onClick={() => {
                setEditExpense(false);
                setSuccess(false);
              }}
            >
              <FaX className="text-gray-600 text-[10px]" />
            </div>
          </div>
          {/* image */}
          <div className="h-16 w-16 md:w-24 md:h-24 relative">
            <Image
              src={correct}
              alt="change type"
              fill={true}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
            />
          </div>

          <div className="flex flex-col gap-4 items-center text-center">
            <h5 className="font-semibold text-lg md:text-xl text-primary-black text-center">
              Expense Edited Successfully
            </h5>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 pt-6 pb-12 px-8 rounded-lg bg-white w-full">
          <div className="flex flex-col">
            <div className="flex w-full justify-between mb-6 gap-6">
              {/* header */}
              <h4 className=" text-lg md:text:2xl text-primary-green font-semibold">
                Edit Expense
              </h4>
              <span
                className="p-2 rounded-full bg-gray-200 cursor-pointer"
                onClick={() => {
                  setEditExpense(false);
                }}
              >
                <FaX className="text-gray-400 text-xs" />
              </span>
            </div>

            <p className="text-xs md:text-sm text-gray-400 text-center w-full -mt-4">
              Folder Name: {budgetName}
            </p>
          </div>

          <LoginInput
            type="text"
            label="Category"
            placeholder="Enter Category"
            name="category"
            value={category!!}
            onChange={(e) => setCategory(e.target.value)}
          />

          <LoginInput
            type="text"
            label="Amount"
            placeholder="Enter Amount"
            name="amount"
            value={amount!!}
            onChange={(e) => setAmount(e.target.value)}
            pattern="[0-9]*"
          />

          <LoginInput
            type="text"
            label="Description"
            placeholder="Enter Description"
            name="description"
            value={description!!}
            onChange={(e) => setDescription(e.target.value)}
          />

          <LoginInput
            type="date"
            label="Date"
            placeholder="Enter Date"
            name="expenseDate"
            value={date!!}
            onChange={(e) => setDate(e.target.value)}
          />

          {error === true && (
            <div className="flex items-center justify-center h-full -mt-4 w-full">
              <p className="text-sm text-center text-error-red mt-4">
                An error occured, could not edit expense
              </p>
            </div>
          )}

          {emptyError === true && (
            <div className="flex items-center justify-center h-full -mt-4 w-full">
              <p className="text-xs md:text-sm text-center text-error-red mt-4">
                Please, fill in all required fields
              </p>
            </div>
          )}

          {loading === true ? (
            <div className="flex items-center w-full justify-center h-fit">
              <Loader />
            </div>
          ) : (
            <div className="w-full mt-4 mx-auto flex justify-between items-center gap-8">
              <BasicButton text="Edit" onClick={() => onSubmit()} />
              <BasicButton
                text="Delete"
                onClick={() => onDelete()}
                deleteBtn={true}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EditExpense;
