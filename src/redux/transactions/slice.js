import { createSlice } from "@reduxjs/toolkit";
import { sendTransactionThunk, transactionByDateThunk } from "./operations";

const initialState = {
  transactions: [],
  loading: false,
  error: null,
  summary: [],
};

const slice = createSlice({
  name: "transactions",
  initialState,
  selectors: {
    selectTransactions: (state) => state.transactions,
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendTransactionThunk.fulfilled, (state, { payload }) => {
        state.transactions.push(payload);
      })

      .addCase(transactionByDateThunk.fulfilled, (state, { payload }) => {
        state.summary = payload;
        state.loading = false;
      })
      .addCase(transactionByDateThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(transactionByDateThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const transactionReducer = slice.reducer;
export const { selectTransactions } = slice.selectors;
