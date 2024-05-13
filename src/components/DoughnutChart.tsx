"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
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
  cutout: "35%",
};

export const data = {
  labels: ["Feeding", "Personal Needs", "Woman", "Transport"],
  datasets: [
    {
      label: "Output",
      data: [12, 19, 14, 8],
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

const DoughnutChart = () => {
  return (
    <Doughnut data={data} options={options} className="overflow-y-hidden " />
  );
};

export default DoughnutChart;
