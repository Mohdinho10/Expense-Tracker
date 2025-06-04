import { useState } from "react";
import EmojiPopup from "../EmojiPopup";
import Input from "../Input";

function AddExpenseForm({ addExpenseHandler }) {
  const [expense, setExpense] = useState({
    category: "",
    icon: "",
    amount: "",
    date: "",
  });

  const changeHandler = (key, value) =>
    setExpense({ ...expense, [key]: value });

  return (
    <div>
      <EmojiPopup
        icon={expense.icon}
        selectHandler={(selectedIcon) => changeHandler("icon", selectedIcon)}
      />
      <Input
        value={expense.category}
        onChange={({ target }) => changeHandler("category", target.value)}
        label="Category"
        placeholder="Rent, Groceries, etc."
        type="text"
        required
      />
      <Input
        value={expense.amount}
        onChange={({ target }) => changeHandler("amount", target.value)}
        label="Amount"
        placeholder="Enter amount"
        type="number"
        required
      />
      <Input
        value={expense.date}
        onChange={({ target }) => changeHandler("date", target.value)}
        label="Date"
        placeholder="Enter date"
        type="date"
      />

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => addExpenseHandler(expense)}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
}

export default AddExpenseForm;
