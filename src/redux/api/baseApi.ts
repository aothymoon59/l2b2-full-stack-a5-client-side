import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://l2b2a5-electronic-gadget-backend.vercel.app/api/v1",
    credentials: "include",
  }),
  endpoints: () => ({}),
});