"use client";
import React, { FC } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { BudgetModel } from "../../utils/types";

interface BarChartProps {
  incomeData: BudgetModel[];
}

const BarChart: FC<BarChartProps> = ({ incomeData }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "bottom" as const,
      },
      title: {
        display: false,
        text: "Chart.js Bar Chart",
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        border: {
          display: true,
          color: "#000000",
          width: 1,
        },
      },
      y: {
        display: true,
        grid: {
          display: false,
        },
        border: {
          display: true,
          color: "#000000",
          width: 2,
        },
      },
    },
  };

  // const labels = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];

  const labels = incomeData.map((income) => income.name);
  const incomeValues = incomeData.map((income) => parseFloat(income.income));
  const expenseValues = incomeData.map(
    (income) => parseFloat(income.totalExpense || "0") // handle missing totalExpense
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeValues,
        backgroundColor: "#107137",
        borderRadius: 6,
      },
      {
        label: "Expense",
        data: expenseValues,
        backgroundColor: "#CE1818",
        borderRadius: 6,
      },
    ],
  };
  return (
    <Bar
      options={options}
      data={data}
      className="overflow-y-hidden w-full h-full"
    />
  );
};

export default BarChart;
