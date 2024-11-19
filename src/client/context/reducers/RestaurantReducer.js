import { createSlice } from "@reduxjs/toolkit";
import { RestaurantApi } from "../api/RestaurantApi";
import { MenuGenerateApi } from "../api/MenuGenerateApi";

const initialState = {
  restaurants: [],
  restaurant: null,
  restaurantsLoading: false,
  reviews: [],
  summary: {
    recommanded_foods: [],
    summary_rating: [],
    summary_text: "",
  },
  prompt_summary: "",
  menu: [],
};
const RestaurantReducer = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurant(state, { payload }) {
      state.restaurant = payload;
    },
    setRestaurantsLoading(state, { payload }) {
      state.restaurantsLoading = payload;
    },
    clearMenu(state,{payload}) {
      state.menu = []
    },
    clearRestaurants(state, action) {
      state.restaurants = [];
    },
    clearReviews(state, action) {
      state.reviews = [];
      state.summary = {
        recommanded_foods: [],
        summary_rating: [],
        summary_text: "",
      };
      state.prompt_summary = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        RestaurantApi.endpoints.getPlaces.matchFulfilled,
        (state, { payload }) => {
          state.restaurants = payload;
        }
      )
      .addMatcher(
        RestaurantApi.endpoints.getRestaurantReviews.matchFulfilled,
        (state, { payload }) => {
          state.reviews = payload;
        }
      )
      .addMatcher(
        RestaurantApi.endpoints.getReviewSummary.matchFulfilled,
        (state, { payload }) => {
          state.summary = payload.data;
        }
      )
      .addMatcher(
        RestaurantApi.endpoints.getReviewSummaryByPrompt.matchFulfilled,
        (state, { payload }) => {
          state.prompt_summary = payload.data;
        }
      )
      .addMatcher(
        MenuGenerateApi.endpoints.getMenu.matchFulfilled,
        (state, { payload }) => {
          try {
            state.menu = JSON.parse(payload.menu);
          } catch (e) {
            state.menu = [];
          }
        }
      );
  },
});

export const { setRestaurant, setRestaurantsLoading, clearReviews,clearMenu, clearRestaurants } =
  RestaurantReducer.actions;
export default RestaurantReducer.reducer;
