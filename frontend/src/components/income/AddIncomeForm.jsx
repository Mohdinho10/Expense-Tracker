import { useState } from "react";
import Input from "../Input";
import EmojiPopup from "../EmojiPopup";

function AddIncomeForm({ addIncomeHandler }) {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
  });

  const changeHandler = (key, value) => setIncome({ ...income, [key]: value });

  return (
    <div>
      <EmojiPopup
        icon={income.icon}
        selectHandler={(selectedIcon) => changeHandler("icon", selectedIcon)}
      />
      <Input
        value={income.source}
        onChange={({ target }) => changeHandler("source", target.value)}
        label="Income Source"
        placeholder="Freelance, Salary, etc."
        type="text"
        required
      />
      <Input
        value={income.amount}
        onChange={({ target }) => changeHandler("amount", target.value)}
        label="Amount"
        placeholder="Enter amount"
        type="number"
        required
      />
      <Input
        value={income.date}
        onChange={({ target }) => changeHandler("date", target.value)}
        label="Date"
        placeholder="Enter date"
        type="date"
      />
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => addIncomeHandler(income)}
        >
          Add Income
        </button>
      </div>
    </div>
  );
}

export default AddIncomeForm;
