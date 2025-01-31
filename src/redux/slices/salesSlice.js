// Redux slice for sales

// src/redux/slices/salesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSalesData = createAsyncThunk("sales/fetch", async () => {
  const response = await fetch("/api/sales");
  return response.json();
});

const salesSlice = createSlice({
  name: "sales",
  initialState: { sales: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSalesData.fulfilled, (state, action) => {
        state.loading = false;
        state.sales = action.payload;
      });
  },
});

export default salesSlice.reducer;
