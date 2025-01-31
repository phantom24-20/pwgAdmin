// Redux slice for appointments
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAppointments = createAsyncThunk(
  "appointments/fetch",
  async (page = 1) => {
    const response = await fetch(`/api/appointments?page=${page}&limit=10`);
    return response.json();
  }
);



const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: { appointments: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      });
  },
});

export default appointmentsSlice.reducer;