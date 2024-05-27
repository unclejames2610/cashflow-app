"use client";
import React, { FC } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { BudgetModel } from "../../utils/types";

interface DoughnutChartProps {
  budgetData: BudgetModel[];
}

const DoughnutChart: FC<DoughnutChartProps> = ({ budgetData }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "bottom" as const,
      },
      title: {
        display: false,
        //   text: "Total Revenue",
      },
    },
    // cutout: "35%",
  };

  const labels = budgetData.map((budget) => budget.name);
  const incomeValues = budgetData.map((budget) => parseFloat(budget.income));

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Income",
        data: incomeValues,
        backgroundColor: ["#357DA0", "#4A4086", "#FF0000", "#FF7A00"],
        //   borderColor: [
        //     "rgba(255, 99, 132, 1)",
        //     "rgba(54, 162, 235, 1)",
        //     "rgba(255, 206, 86, 1)",
        //     "rgba(75, 192, 192, 1)",
        //   ],
        borderWidth: 0,
      },
    ],
  };
  return (
    <Doughnut data={data} options={options} className="overflow-y-hidden " />
  );
};

export default DoughnutChart;
