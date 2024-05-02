import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  transactionByDateThunk,
  userTransactionsThunk,
} from "../transactions/operations";
const initialState = {
  isLoading: false,
};

const slice = createSlice({
  name: "loader",
  initialState,
  selectors: {
    selectIsLoading: (state) => state.isLoading,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(userTransactionsThunk.pending, transactionByDateThunk.pending),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          userTransactionsThunk.fulfilled,
          transactionByDateThunk.fulfilled
        ),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          userTransactionsThunk.rejected,
          transactionByDateThunk.rejected
        ),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export const loaderReducer = slice.reducer;
export const { selectIsLoading } = slice.selectors;
