import { useGetDashboardDataQuery } from "../slices/dashboardApiSlice";
import { IoMdCard } from "react-icons/io";
import { addThousandSeparator } from "../utils/helper";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import Loader from "../components/Loader";
import InfoCard from "../components/InfoCard";
import RecentTransactions from "../components/RecentTransactions";
import FinanceOverview from "../components/FinanceOverview";
import ExpenseTransactions from "../components/ExpenseTransactions";
import Last30DaysExpenses from "../components/Last30DaysExpenses";
import RecentIncomeWithChart from "../components/RecentIncomeWithChart";
import RecentIncome from "../components/RecentIncome";

function HomePage() {
  const { data: dashboardData, isLoading } = useGetDashboardDataQuery();

  console.log("Dashboard Data:", dashboardData);
  console.log(dashboardData?.last30DaysExpenses?.transactions);
  const navigate = useNavigate();
  if (isLoading) return <Loader />;

  return (
    // <DashboardLayout activeMenu="Dashboard">
    <div className="mx-auto my-5">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <InfoCard
          icon={<IoMdCard />}
          label="Total Balance"
          value={addThousandSeparator(dashboardData.totalBalance || 0)}
          color="bg-primary"
        />
        <InfoCard
          icon={<LuWalletMinimal />}
          label="Total Income"
          value={addThousandSeparator(dashboardData.totalIncome || 0)}
          // color="bg-orange-500"
          color="bg-[#10B981]"
        />
        <InfoCard
          icon={<LuHandCoins />}
          label="Total Expense"
          value={addThousandSeparator(dashboardData.totalExpenses || 0)}
          color="bg-red-500"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <RecentTransactions
          transactions={dashboardData?.recentTransactions}
          onSeeMore={() => navigate("/expense")}
        />

        <FinanceOverview
          totalBalance={dashboardData?.totalBalance || 0}
          totalIncome={dashboardData?.totalIncome || 0}
          totalExpense={dashboardData?.totalExpenses || 0}
        />

        <ExpenseTransactions
          transactions={dashboardData.last30DaysExpenses?.transactions || []}
          onSeeMore={() => navigate("/expense")}
        />
        <Last30DaysExpenses
          data={dashboardData?.last30DaysExpenses?.transactions || []}
        />

        <RecentIncomeWithChart
          data={
            dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []
          }
          totalIncome={dashboardData?.totalIncome || 0}
        />

        <RecentIncome
          transactions={dashboardData?.last60DaysIncome?.transactions || []}
          onSeeMore={() => navigate("/income")}
        />
      </div>
    </div>
    // </DashboardLayout>
  );
}

export default HomePage;
