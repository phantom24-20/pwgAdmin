// Redux slice for customers

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCustomers = createAsyncThunk("customers/fetch", async () => {
  const response = await fetch("/api/customers");
  return response.json();
});

const customersSlice = createSlice({
  name: "customers",
  initialState: { customers: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      });
  },
});

export default customersSlice.reducer;