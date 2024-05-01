import { createSlice } from "@reduxjs/toolkit";
import { sendTransactionThunk, transactionByDateThunk, userTransactionsThunk } from "./operations";

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
    selectLoading: (state)=>state.loading
  },
  extraReducers: (builder) => {
    builder.addCase(sendTransactionThunk.fulfilled, (state, { payload }) => {
      state.transactions.push(payload);
    })
      .addCase(userTransactionsThunk.fulfilled, (state, { payload }) => {
        state.transactions = payload;
        state.loading = false
      })
      .addCase(userTransactionsThunk.pending, (state) => {
        state.loading = true
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
export const { selectTransactions, selectLoading } = slice.selectors;
