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
  loading: false,
  error: null,
  summary: [],
  categories: [],
};

const slice = createSlice({
  name: "transactions",
  initialState,
  selectors: {
    selectTransactions: (state) => state.transactions,
    selectLoading: (state) => state.loading,
    selectCategories: (state) => state.categories,
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendTransactionThunk.fulfilled, (state, { payload }) => {
        state.transactions.push(payload);
      })
      .addCase(userTransactionsThunk.fulfilled, (state, { payload }) => {
        state.transactions = payload;
        state.loading = false;
      })
      .addCase(userTransactionsThunk.pending, (state) => {
        state.loading = true;
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
      })
      .addCase(deleteTransactionThunk.fulfilled, (state, { payload }) => {
        state.transactions = state.transactions.filter(
          (item) => item.id !== payload
        );
        state.loading = false;
        state.error = false;
      })
      .addCase(transactionsCategoriesThunk.fulfilled, (state, { payload }) => {
        state.categories = payload;
      })
      .addCase(deleteTransactionThunk.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteTransactionThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(editTransactionThunk.fulfilled, (state, { payload }) => {
        const transactionIndex = state.transactions.findIndex(
          (t) => t.id === payload.id
        );
        state.transactions[transactionIndex] = payload;
      });
  },
});

export const transactionReducer = slice.reducer;
export const { selectTransactions, selectLoading, selectCategories } =
  slice.selectors;
