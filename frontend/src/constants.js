export const BASE_URL =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";

export const INCOME_URL = "/api/incomes";
export const EXPENSE_URL = "/api/expenses";
export const USERS_URL = "/api/users";
export const DASHBOARD_URL = "/api/dashboard";
