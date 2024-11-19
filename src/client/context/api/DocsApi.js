import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import prepareHeader from "./prepareHeaders";
import { BASEURL } from "../../../urls";
const URI = "/api/docreader";
export const DocsApi = createApi({
  reducerPath: "docsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASEURL + URI,
    prepareHeaders: prepareHeader,
  }),
  endpoints: (builder) => ({
    askQuestion: builder.query({
      query: (data) => ({
        url: "question",
        method: "GET",
        params: data,
      }),
    }),
    upload: builder.mutation({
      query: (data) => ({
        url: "upload",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAskQuestionQuery, useUploadMutation } = DocsApi;
