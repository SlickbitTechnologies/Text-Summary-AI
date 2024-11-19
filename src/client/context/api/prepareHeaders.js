import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const prepareHeader = (headers, { getState }) => {
  // const token = localStorage.getItem("token")
  const token = getState()?.auth?.token;
  const idToken = getState()?.auth?.idToken;

  if (token) {
    headers.set("token", token);
    headers.set("id", idToken);
  }

  return headers;
};

export default prepareHeader;
