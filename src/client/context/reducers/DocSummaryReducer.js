import { createSlice } from "@reduxjs/toolkit";
import { DocSummaryApi } from "../api/DocSummaryApi";

const initialState = {
  translateText: "",
  summaryText: "",
  graqChat: [],
};
const isRejectedAction = (action) => {
  return action.type.endsWith("rejected");
};
const isPendingAction = (action) => {
  return action.type.endsWith("pending");
};
const DocSummaryReducer = createSlice({
  name: "docsummary",
  initialState,
  reducers: {
    clearDocSummary(state, { payload }) {
      state.translateText = "";
      state.summaryText = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        DocSummaryApi.endpoints.getTranslate.matchFulfilled,
        (state, { payload }) => {
          state.translateText = payload.message;
        }
      )
      .addMatcher(
        DocSummaryApi.endpoints.getDocSummary.matchFulfilled,
        (state, { payload }) => {
          state.summaryText = payload.message;
        }
      )
      .addMatcher(
        DocSummaryApi.endpoints.askGraq.matchFulfilled,
        (state, { payload }) => {
          state.graqChat = payload;
        }
      );
  },
});
export const { clearDocSummary } = DocSummaryReducer.actions;
export default DocSummaryReducer.reducer;
