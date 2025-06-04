import moment from "moment";
import TransactionInfoCard from "../TransactionInfoCard";
import { LuDownload } from "react-icons/lu";

function ExpenseList({ transactions, deleteHandler, downloadHandler }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">All Expenses</h5>
        <button className="card-btn" onClick={downloadHandler}>
          <LuDownload className="text-base" /> Download
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.source}
            icon={expense.icon}
            date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            type="expense"
            deleteHandler={() => deleteHandler(expense._id)}
          />
        ))}
      </div>
    </div>
  );
}

export default ExpenseList;
