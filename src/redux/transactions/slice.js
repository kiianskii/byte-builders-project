import { createSlice } from "@reduxjs/toolkit";
import { sendTransactionThunk } from "./operations";

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
  },
  extraReducers: (builder) => {
    builder.addCase(sendTransactionThunk.fulfilled, (state, { payload }) => {
      state.transactions.push(payload);
    });
  },
});

export const transactionReducer = slice.reducer;
export const { selectTransactions } = slice.selectors;
