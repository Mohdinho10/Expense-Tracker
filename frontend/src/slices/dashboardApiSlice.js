import { DASHBOARD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => ({
        url: DASHBOARD_URL,
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetDashboardDataQuery } = dashboardApiSlice;
