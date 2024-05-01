import { createSlice } from "@reduxjs/toolkit";
import { sendTransactionThunk, userTransactionsThunk } from "./operations";

const initialState = {
  transactions: [],
  loading: false,
  error: null,
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
      });
    
  },
});

export const transactionReducer = slice.reducer;
export const { selectTransactions, selectLoading } = slice.selectors;
