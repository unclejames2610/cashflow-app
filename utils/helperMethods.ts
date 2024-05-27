import { Expense } from "./types";

export function formatDateAndTime(dateTimeString: string): string {
  // Create a Date object from the provided date string
  const date = new Date(dateTimeString);

  // Extract day, month, year, hours, and minutes from the Date object
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Concatenate the formatted date and time
  const formattedDate = `${day}/${month}/${year}, ${hours}:${minutes}`;

  return formattedDate;
}

export function formatMonthAndYear(dateTimeString: string): string {
  // Create a Date object from the provided date string
  const date = new Date(dateTimeString);

  // Extract day, month, year, hours, and minutes from the Date object
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Concatenate the formatted date and time
  const formattedDate = `${month}, ${year}`;

  return formattedDate;
}

export function formatTime(dateTimeString: string): string {
  // Create a Date object from the provided date string
  const date = new Date(dateTimeString);

  // Extract day, month, year, hours, and minutes from the Date object
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Concatenate the formatted date and time
  const formattedTime = `${hours}:${minutes}`;

  return formattedTime;
}

interface FirebaseTimestamp {
  seconds: number;
  nanoseconds: number;
}
// Function to convert Firebase Timestamp to 24-hour format
export const convertTimestampTo24HourFormat = (
  timestamp: FirebaseTimestamp
) => {
  // Convert seconds to milliseconds and create a new Date object
  const date = new Date(timestamp?.seconds * 1000);

  const hours: number = date.getHours();
  const minutes: number = date.getMinutes();
  const seconds: number = date.getSeconds();

  // Pad single digit hours, minutes, and seconds with leading zeros
  const paddedHours: string = String(hours).padStart(2, "0");
  const paddedMinutes: string = String(minutes).padStart(2, "0");
  const paddedSeconds: string = String(seconds).padStart(2, "0");

  // Return the time in 24-hour format (HH:MM:SS)
  return `${paddedHours}:${paddedMinutes}`;
};

export const formatToLocaleDateString = (dateTimeString: string) => {
  // Convert seconds to milliseconds and create a new Date object
  const date = new Date(dateTimeString);

  const today = new Date();

  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return "Today";
  } else if (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  ) {
    return "Yesterday";
  } else {
    // Format the date according to the specified options
    const formattedDate = date.toDateString();

    return formattedDate;
  }
};

export const convertTimestampToLocalDateString = (
  timestamp: FirebaseTimestamp
) => {
  // Convert seconds to milliseconds and create a new Date object
  const date = new Date(timestamp?.seconds * 1000);

  const today = new Date();

  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return "Today";
  } else if (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  ) {
    return "Yesterday";
  } else {
    const options: {
      weekday: "short";
      day: "numeric";
      month: "short";
      year: "numeric";
    } = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    };

    // Format the date according to the specified options
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  }
};

export const formatAmount = (amount: number): string => {
  return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const calculateTotalExpense = (expenses: Expense[]): string => {
  let total = 0;
  expenses.forEach((expense) => {
    total += parseFloat(expense.amount);
  });
  return total.toString(); // convert total to string for consistency
};

export const calculateBalance = (
  income: string,
  totalExpense: string
): string => {
  return (parseFloat(income) - parseFloat(totalExpense)).toString();
};
