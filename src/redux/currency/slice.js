import { createSlice } from "@reduxjs/toolkit";
import { currencyThunk } from "../currency/operations";

const initialState = {
  exchangeRates: [],
  isLoading: false,
  error: null,
};

const exchangeRatesSlice = createSlice({
  name: "exchangeRates",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(currencyThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(currencyThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.exchangeRates = action.payload;
      })
      .addCase(currencyThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default exchangeRatesSlice.reducer;
