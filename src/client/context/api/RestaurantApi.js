import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import prepareHeader from "./prepareHeaders";
import { BASEURL } from "../../../urls";
const URI = "/api/restaurantreviews";
export const RestaurantApi = createApi({
  reducerPath: "restaurantApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASEURL + URI,
    prepareHeaders: prepareHeader,
  }),
  endpoints: (builder) => ({
    getRestaurantReviews: builder.query({
      query: (data) => ({
        url: "reviews",
        method: "GET",
        params: data,
      }),
    }),
    getPlaces: builder.query({
      query: (data) => ({
        url: "places",
        method: "GET",
        params: data,
      }),
    }),
    getReviewSummary: builder.mutation({
      query: (data) => ({
        url: "summary",
        method: "POST",
        body: data,
      }),
    }),
    getReviewSummaryByPrompt: builder.mutation({
      query: (data) => ({
        url: "summaryByPrompt",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetRestaurantReviewsQuery,
  useGetPlacesQuery,
  useGetReviewSummaryByPromptMutation,
  useGetReviewSummaryMutation,
} = RestaurantApi;
