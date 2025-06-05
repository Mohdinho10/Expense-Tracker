export const BASE_URL =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://expense-tracker-tpxc.onrender.com";

export const INCOME_URL = "/api/incomes";
export const EXPENSES_URL = "/api/expenses";
export const USERS_URL = "/api/users";
export const DASHBOARD_URL = "/api/dashboard";
