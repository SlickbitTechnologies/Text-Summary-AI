import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import RestaurantReducer from "../reducers/RestaurantReducer";
import { MenuGenerateApi } from "../api/MenuGenerateApi";
import DocSummaryReducer from "../reducers/DocSummaryReducer";
import { DocSummaryApi } from "../api/DocSummaryApi";
// import authReducer from "./AuthSlice.js";
const rootReducer = combineReducers({
  [MenuGenerateApi.reducerPath]: MenuGenerateApi.reducer,
  [DocSummaryApi.reducerPath]: DocSummaryApi.reducer,
  restaurant: RestaurantReducer,
  docsummary: DocSummaryReducer,
});
const persistConfig = {
  key: "mvp-slickbit",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(MenuGenerateApi.middleware)
      .concat(DocSummaryApi.middleware),
});
const persister = persistStore(store);
export { store, persister };
