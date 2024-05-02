import { createAsyncThunk } from "@reduxjs/toolkit";

import { goitApi } from "../../config/goitApi";

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
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteTransactionThunk = createAsyncThunk(
  "trans/delete-transaction",
  async (id, thunkAPI) => {
    try {
      await goitApi.delete(`/api/transactions/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
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

// ЩО ПОТРІБНО ПЕРЕДАВАТИ
// const foredit = {
// id: "bb480de9-b9ab-4c81-87cc-a5dc7618c134",
// credentials: {
//   transactionDate: "2024-01-02",
//   type: "INCOME",
//   categoryId: "063f1132-ba5d-42b4-951d-44011ca46262",
//   comment: "ALALALALA",
//   amount: 0
//    }
// }

// const forSend = {
//   transactionDate: "2024-01-01",
//   type: "INCOME",
//   categoryId: "063f1132-ba5d-42b4-951d-44011ca46262",
//   comment: "Test",
//   amount: 10000
// }

//   const forTransactionsByDate = {
//     month: 1,
//     year: 2024
// }
