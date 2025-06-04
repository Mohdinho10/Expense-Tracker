import CustomPieChart from "./charts/CustomPieChart";

const COLORS = ["#64748B", "#fb2c36", "#10B981"];

function FinanceOverview({ totalBalance, totalIncome, totalExpense }) {
  const balanceData = [
    { name: "Total Balance", value: totalBalance },
    { name: "Total Income", value: totalIncome },
    { name: "Total Expense", value: totalExpense },
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Financial Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`$${totalBalance}`}
        colors={COLORS}
        showTextAnchor
        dataKey="value"
      />
    </div>
  );
}

export default FinanceOverview;
