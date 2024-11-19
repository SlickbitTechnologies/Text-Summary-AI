import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import prepareHeader from "./prepareHeaders";
import { BASEURL } from "../../../urls";

const URI = "/api/docsummary";

export const DocSummaryApi = createApi({
  reducerPath: "docsummaryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASEURL + URI,
    prepareHeaders: prepareHeader,
  }),
  endpoints: (builder) => ({
    getDocSummary: builder.mutation({
      query: (data) => ({
        url: "summary",
        method: "POST",
        body: data,
      }),
    }),
    getTranslate: builder.mutation({
      query: (data) => ({
        url: "translate",
        method: "POST",
        body: data,
      }),
    }),
    askGraq: builder.query({
      query: (data) => ({
        url: "askGraq",
        method: "GET",
        params: data,
      }),
    }),
  }),
});

export const {
  useGetDocSummaryMutation,
  useGetTranslateMutation,
  useAskGraqQuery,
} = DocSummaryApi;
