import { useEffect, useState } from "react";
import { prepareExpenseLineChartData } from "../../utils/helper";
import { LuPlus } from "react-icons/lu";
import CustomLineChart from "../charts/CustomLineChart";

function ExpenseView({ transactions, addExpenseHandler }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="card w-full rounded-2xl bg-white p-4 shadow-md sm:p-6">
      {/* Header Section */}
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-center sm:text-left">
          <h2 className="text-lg font-semibold text-gray-800 sm:text-xl">
            Expense Overview
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Track your spending trends and gain insights into where your money
            goes.
          </p>
        </div>

        <div className="flex justify-center sm:justify-end">
          <button
            onClick={addExpenseHandler}
            className="bg-primary hover:bg-primary-dark inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white shadow transition-all"
          >
            <LuPlus className="text-base" />
            Add Expense
          </button>
        </div>
      </div>

      {/* Chart Section */}
      <div className="mt-4 sm:mt-6">
        {chartData.length > 0 ? (
          <CustomLineChart data={chartData} />
        ) : (
          <div className="py-10 text-center text-sm text-gray-400">
            No expense data to display yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default ExpenseView;
