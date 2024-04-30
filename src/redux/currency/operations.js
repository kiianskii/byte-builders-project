import { createAsyncThunk } from "@reduxjs/toolkit";
import { monoApi } from "../../config/monoAPI";

export const currencyThunk = createAsyncThunk(
  "bank/currency",
  async (_, thunkApi) => {
    const currentTime = new Date().getTime();
    const storedData = localStorage.getItem("exchangeRatesData");

    let exchangeRates;

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const lastRequestTime = new Date(parsedData.time).getTime();

      if (currentTime - lastRequestTime < 3600000) {
        exchangeRates = parsedData.exchangeRates;
      } else {
        try {
          const { data } = await monoApi.get("/bank/currency");
          exchangeRates = data
            .filter(
              (item) =>
                item.currencyCodeA === "840" || item.currencyCodeA === "978"
            )
            .map((item) => ({
              currency: item.currencyCodeA,
              rate: item.rateSell,
            }));

          localStorage.setItem(
            "exchangeRatesData",
            JSON.stringify({ time: new Date(), exchangeRates })
          );
        } catch (error) {
          return thunkApi.rejectWithValue(error.message);
        }
      }
    } else {
      try {
        const { data } = await monoApi.get("/bank/currency");
        exchangeRates = data
          .filter(
            (item) =>
              item.currencyCodeA === "840" || item.currencyCodeA === "978"
          )
          .map((item) => ({
            currency: item.currencyCodeA,
            rate: item.rateSell,
          }));

        localStorage.setItem(
          "exchangeRatesData",
          JSON.stringify({ time: new Date(), exchangeRates })
        );
      } catch (error) {
        return thunkApi.rejectWithValue(error.message);
      }
    }

    return exchangeRates;
  }
);
