import { useEffect, useState } from "react";
import CustomPieChart from "../charts/CustomPieChart";

const COLORS = [
  "#64748B", // slate-500
  "#94A3B8", // slate-400
  "#CBD5E1", // slate-300
  "#E2E8F0", // slate-200
  "#F1F5F9", // slate-100
  "#475569", // slate-600
  "#334155", // slate-700
];

function RecentIncomeWithChart({ data, totalIncome }) {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    const dataArr = data.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));
    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();

    return () => {};
  }, [data]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 days Income</h5>
      </div>
      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`$${totalIncome}`}
        showTextAnchor
        colors={COLORS}
        dataKey="amount"
      />
    </div>
  );
}

export default RecentIncomeWithChart;
