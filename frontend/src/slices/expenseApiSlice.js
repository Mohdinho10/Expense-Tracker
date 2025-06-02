import { EXPENSES_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const expenseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExpenses: builder.query({
      query: () => ({
        url: `${EXPENSES_URL}`,
        credentials: "include",
      }),
      providesTags: ["Expenses"],
    }),

    addExpense: builder.mutation({
      query: (data) => ({
        url: `${EXPENSES_URL}`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Expenses"],
    }),

    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `${EXPENSES_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Expenses"],
    }),

    downloadExpenseExcel: builder.mutation({
      query: () => ({
        url: `${EXPENSES_URL}/downloadExcel`,
        method: "GET",
        responseHandler: (response) => response.blob(), // handle as binary
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useAddExpenseMutation,
  useDeleteExpenseMutation,
  useDownloadExpenseExcelMutation,
} = expenseApiSlice;
