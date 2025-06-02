import { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../utils/helper";
import CustomBarChart from "./CustomBarChart";

function Last30DaysExpenses({ data }) {
  const [chartData, setChartData] = useState([]);
  console.log("Last30DaysExpenses data", chartData);
  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartData(result);

    return () => {};
  }, [data, setChartData]);

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 30 Days Expenses</h5>
      </div>

      <CustomBarChart data={chartData} />
    </div>
  );
}

export default Last30DaysExpenses;
