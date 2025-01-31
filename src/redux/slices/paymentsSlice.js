// Redux slice for payments
// src/redux/slices/paymentsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPayments = createAsyncThunk("payments/fetch", async () => {
  const response = await fetch("/api/payments");
  return response.json();
});

const paymentsSlice = createSlice({
  name: "payments",
  initialState: { payments: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      });
  },
});

export default paymentsSlice.reducer;
