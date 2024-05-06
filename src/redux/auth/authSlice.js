import { createSlice } from "@reduxjs/toolkit";
import {
  balanceThunk,
  refreshThunk,
  registerThunk,
  signInThunk,
  signOutThunk,
} from "./operations";

const initialState = {
  user: {
    name: "",
    email: "",
  },
  token: "",
  isLoggedIn: false,
  balance: "",
};

const slice = createSlice({
  name: "auth",
  initialState,
  selectors: {
    selectToken: (state) => state.token,
    selectUser: (state) => state.user,
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        state.user.name = payload.username;
        state.user.email = payload.email;
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addCase(signInThunk.fulfilled, (state, { payload }) => {
        state.user.name = payload.username;
        state.user.email = payload.email;
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addCase(signOutThunk.fulfilled, () => {
        return initialState;
      })
      .addCase(refreshThunk.fulfilled, (state, { payload }) => {
        state.balance = payload.balance;
        state.user.name = payload.username;
        state.user.email = payload.email;
        state.isLoggedIn = true;
      })
      .addCase(balanceThunk.fulfilled, (state, { payload }) => {
        state.balance = payload;
      });
  },
});

export const authReducer = slice.reducer;
export const { selectToken, selectIsLoggedIn, selectUser } = slice.selectors;
