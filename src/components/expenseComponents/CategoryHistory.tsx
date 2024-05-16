import React from "react";

const CategoryHistoryTable = () => {
  const categoryHistoryList = [
    {
      category: "Food",
      description: "Feeding",
      amount: "N10000",
    },
    {
      category: "Food",
      description: "Feeding",
      amount: "N10000",
    },
    {
      category: "Food",
      description: "Feeding",
      amount: "N10000",
    },
    {
      category: "Food",
      description: "Feeding",
      amount: "N10000",
    },
    {
      category: "Food",
      description: "Feeding",
      amount: "N10000",
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <h5>Category History</h5>
      <div className="overflow-x-auto lg:overflow-x-hidden">
        <table className="table-auto w-full ">
          <thead>
            <tr className="font-medium md:text-base text-sm text-left pb-6 md:pb-8">
              <th className="px-2 py-4">S/N</th>

              <th className="px-2 py-4">Category</th>

              <th className="px-2 py-4">Description</th>
              <th className="px-2 py-4">Amount</th>
            </tr>
          </thead>
          <tbody>
            {categoryHistoryList?.map((category, index) => (
              <tr
                key={index}
                className={`border-b-[0.5px] border-gray-500 hover:bg-light-green text-sm text-primary-black cursor-pointer `}
                //   onClick={() => handleRowClick(product._id)}
              >
                <td className="px-2 py-4">{index + 1}</td>

                <td className="px-2 py-4">{category.category}</td>
                <td className="px-2 py-4">{category.description}</td>
                <td className="px-2 py-4">{category.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-1 items-center justify-center w-full text-xs md:text-sm">
        {"<"} <span>1</span> <span>2</span> <span>3</span> <span>4</span>
        <span>5</span>
        {">"}
      </div>
    </div>
  );
};

export default CategoryHistoryTable;
