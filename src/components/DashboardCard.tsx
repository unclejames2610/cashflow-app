import Image from "next/image";
import React, { FC } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import ellipse from "../../public/assets/ellipse.svg";
import { formatAmount } from "../../utils/helperMethods";

interface DashboardCardProps {
  currentBalance: string;
  totalIncome: string;
  totalSpending: string;
  totalSavings: string;
}

const DashboardCard: FC<DashboardCardProps> = ({
  currentBalance,
  totalIncome,
  totalSavings,
  totalSpending,
}) => {
  return (
    <div className="rounded-lg shadow-md bg-primary-green w-full flex flex-col justify-between lg:h-72 gap-8 text-white relative p-6 overflow-hidden">
      <div className="absolute -right-4 top-0">
        <div className="relative h-24 w-24 md:h-48 md:w-48 ">
          <Image
            src={ellipse}
            alt="ellipse"
            fill={true}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <p className="text-xs md:text-sm text-white/70">Current Balance</p>
          <span className="cursor-pointer">
            <MdOutlineRemoveRedEye className="text-lg" />
          </span>
        </div>
        <h2 className="text-xl md:text-3xl font-bold ">
          N{formatAmount(Number(currentBalance))}
        </h2>
      </div>

      <div className="flex items-center flex-wrap">
        <div className="flex flex-col gap-2 p-4">
          <h6 className="text-xs md:text-sm text-white/70">Total Income</h6>
          <h5 className="text-sm md:text-base font-semibold">
            N{formatAmount(Number(totalIncome))}
          </h5>
        </div>
        <div className="flex flex-col gap-2 p-4 border-x-[0.5px] border-white/50">
          <h6 className="text-xs md:text-sm text-white/70">Total Spending</h6>
          <h5 className="text-sm md:text-base font-semibold">
            N{formatAmount(Number(totalSpending))}
          </h5>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <h6 className="text-xs md:text-sm text-white/70">Total Savings</h6>
          <h5 className="text-sm md:text-base font-semibold">
            N{formatAmount(Number(totalSavings))}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
