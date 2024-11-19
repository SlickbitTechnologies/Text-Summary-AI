import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import prepareHeader from "./prepareHeaders";
import { BASEURL } from "../../../urls";

const URI = "/api/menugenerator";

export const MenuGenerateApi = createApi({
  reducerPath: "menuApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASEURL + URI,
    prepareHeaders: prepareHeader,
  }),
  endpoints: (builder) => ({
    getMenu: builder.query({
      query: (data) => ({
        url: "generate",
        method: "GET",
        params: data,
      }),
    }),
  }),
});

export const { useGetMenuQuery } = MenuGenerateApi;
