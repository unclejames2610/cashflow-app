import React, { FC } from "react";

interface BudgetListProps {
  text: string;
  date: string;
}

const BudgetList: FC<BudgetListProps> = ({ text, date }) => {
  return (
    <div className="flex justify-between gap-4 px-2 py-4 rounded-lg hover:bg-primary-green group cursor-pointer">
      <p className="text-xs md:text-sm group-hover:text-white">{text}</p>
      <p className="text-xs md:text-sm text-gray-300">{date}</p>
    </div>
  );
};

export default BudgetList;
