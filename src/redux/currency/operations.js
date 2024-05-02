import { createAsyncThunk } from "@reduxjs/toolkit";
import { monoApi } from "../../config/monoAPI";

export const currencyThunk = createAsyncThunk("bank/currency", async () => {
  const currentTime = new Date().getTime();
  const storedData = localStorage.getItem("exchangeRatesData");

  let exchangeRates;

  if (storedData) {
    const parsedData = JSON.parse(storedData);
    const lastRequestTime = new Date(parsedData.time).getTime();

    if (currentTime - lastRequestTime < 3600000) {
      exchangeRates = parsedData.exchangeRates;
      return exchangeRates;
    }
  }

  const { data } = await monoApi.get("/bank/currency");
  exchangeRates = data.slice(0, 2).map((item) => ({
    currency: item.currencyCodeA,
    rateBuy: item.rateBuy,
    rateSell: item.rateSell,
  }));
  localStorage.setItem(
    "exchangeRatesData",
    JSON.stringify({ time: new Date(), exchangeRates })
  );

  return exchangeRates;
});
