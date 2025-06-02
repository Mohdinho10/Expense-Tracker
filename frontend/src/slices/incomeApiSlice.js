import { apiSlice } from "./apiSlice";
import { INCOME_URL } from "../constants";

export const incomeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getIncomes: builder.query({
      query: () => ({
        url: `${INCOME_URL}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Income"],
    }),

    addIncome: builder.mutation({
      query: (data) => ({
        url: `${INCOME_URL}`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Income"],
    }),

    deleteIncome: builder.mutation({
      query: (id) => ({
        url: `${INCOME_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Income"],
    }),

    downloadIncomeExcel: builder.mutation({
      query: () => ({
        url: `${INCOME_URL}/downloadExcel`,
        method: "GET",
        responseHandler: (response) => response.blob(),
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetIncomesQuery,
  useAddIncomeMutation,
  useDeleteIncomeMutation,
  useDownloadIncomeExcelMutation,
} = incomeApiSlice;
