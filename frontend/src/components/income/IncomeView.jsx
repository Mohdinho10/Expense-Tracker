import { useEffect, useState } from "react";
import { prepareIncomeBarChartData } from "../../utils/helper";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../charts/CustomBarChart";

function IncomeView({ transactions, addIncomeHandler }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="card w-full rounded-2xl bg-white p-4 shadow-md sm:p-6">
      {/* Header Section */}
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-center sm:text-left">
          <h2 className="text-lg font-semibold text-gray-800 sm:text-xl">
            Income Overview
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Track your earnings over time and analyze your income trends.
          </p>
        </div>

        <div className="flex justify-center sm:justify-end">
          <button
            onClick={addIncomeHandler}
            className="bg-primary hover:bg-primary-dark inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white shadow transition-all"
          >
            <LuPlus className="text-base" />
            Add Income
          </button>
        </div>
      </div>

      {/* Chart Section */}
      <div className="mt-4 sm:mt-6">
        {chartData.length > 0 ? (
          <CustomBarChart data={chartData} />
        ) : (
          <div className="py-10 text-center text-sm text-gray-400">
            No income data to display yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default IncomeView;
