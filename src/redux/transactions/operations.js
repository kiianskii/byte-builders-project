import { createAsyncThunk } from "@reduxjs/toolkit";

import { goitApi } from "../../config/goitApi";
import { balanceThunk } from "../auth/operations";

export const transactionsCategoriesThunk = createAsyncThunk(
  "trans/categories",
  async (_, thunkApi) => {
    try {
      const { data } = await goitApi.get("/api/transaction-categories");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const userTransactionsThunk = createAsyncThunk(
  "trans/user-transactions",
  async (_, thunkApi) => {
    try {
      const { data } = await goitApi.get("/api/transactions");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const sendTransactionThunk = createAsyncThunk(
  "trans/send-transaction",
  async (credentials, thunkApi) => {
    try {
      const { data } = await goitApi.post("/api/transactions", credentials);
      thunkApi.dispatch(balanceThunk());
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const editTransactionThunk = createAsyncThunk(
  "trans/edit-transaction",
  async ({ id, credentials }, thunkApi) => {
    try {
      const { data } = await goitApi.patch(
        `/api/transactions/${id}`,
        credentials
      );
      thunkApi.dispatch(balanceThunk());
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteTransactionThunk = createAsyncThunk(
  "trans/delete-transaction",
  async (id, thunkApi) => {
    try {
      await goitApi.delete(`/api/transactions/${id}`);
      thunkApi.dispatch(balanceThunk());
      return id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const transactionByDateThunk = createAsyncThunk(
  "trans/transaction-by-date",
  async (credentials, thunkApi) => {
    try {
      const { data } = await goitApi.get("/api/transactions-summary", {
        params: credentials,
      });
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
