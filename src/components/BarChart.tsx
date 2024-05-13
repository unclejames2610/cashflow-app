"use client";
import React from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
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

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Income",
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      backgroundColor: "#107137",
      borderRadius: 6,
    },
    {
      label: "Expense",
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      backgroundColor: "#CE1818",
      borderRadius: 6,
    },
  ],
};

export const BarChart = () => {
  return (
    <Bar
      options={options}
      data={data}
      className="overflow-y-hidden w-full h-full"
    />
  );
};
