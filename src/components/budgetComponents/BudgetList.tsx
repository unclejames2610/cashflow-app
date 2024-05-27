import React, { FC, MouseEventHandler } from "react";

interface BudgetListProps {
  text: string;
  date: string;
  onClick: MouseEventHandler<HTMLDivElement>;
  budgetName: string;
}

const BudgetList: FC<BudgetListProps> = ({
  text,
  date,
  onClick,
  budgetName,
}) => {
  return (
    <div
      className={`flex justify-between gap-4 px-2 py-4 rounded-lg hover:bg-primary-green/10 group cursor-pointer ${
        budgetName === text ? "bg-primary-green text-white" : ""
      }`}
      onClick={onClick}
    >
      <p className="text-xs md:text-sm group-hover:text-black ">{text}</p>
      <p className="text-xs md:text-sm text-gray-300 group-hover:text-gray-600">
        {date}
      </p>
    </div>
  );
};

export default BudgetList;
