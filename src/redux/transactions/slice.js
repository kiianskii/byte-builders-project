import { createSlice } from "@reduxjs/toolkit";
import {
  deleteTransactionThunk,
  editTransactionThunk,
  sendTransactionThunk,
  transactionByDateThunk,
  transactionsCategoriesThunk,
  userTransactionsThunk,
} from "./operations";

const initialState = {
  transactions: [],
  error: null,
  summary: [],
  categories: [],
};

const slice = createSlice({
  name: "transactions",
  initialState,
  selectors: {
    selectTransactions: (state) => state.transactions,
    selectCategories: (state) => state.categories,
  },
  extraReducers: (builder) => {
    builder

      .addCase(sendTransactionThunk.fulfilled, (state, { payload }) => {
        state.transactions.push(payload);
      })
      .addCase(sendTransactionThunk.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(userTransactionsThunk.fulfilled, (state, { payload }) => {
        state.transactions = payload;
      })

      .addCase(transactionByDateThunk.fulfilled, (state, { payload }) => {
        state.summary = payload;
      })

      .addCase(transactionByDateThunk.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(deleteTransactionThunk.fulfilled, (state, { payload }) => {
        state.transactions = state.transactions.filter(
          (item) => item.id !== payload
        );
        state.error = false;
      })
      .addCase(transactionsCategoriesThunk.fulfilled, (state, { payload }) => {
        state.categories = payload;
      })
      .addCase(deleteTransactionThunk.pending, (state) => {
        state.error = false;
      })
      .addCase(deleteTransactionThunk.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(editTransactionThunk.fulfilled, (state, { payload }) => {
        const index = state.transactions.findIndex(
          (transaction) => transaction.id === payload.id
        );
        if (index !== -1) {
          state.transactions[index] = payload;
        } else {
          state.transactions.push(payload);
        }
      });
  },
});

export const transactionReducer = slice.reducer;
export const { selectTransactions, selectCategories } = slice.selectors;
