import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const getSupervisor = createAsyncThunk('supervisor/getSupervisor', async (id) => {
    try {
      const { data } = await axiosInstance.get(`/Member/Active/Supervisor/Farm(${id})`)
      return data
    } catch (error) {
    }
  })

const supervisorSlice = createSlice({
  name: "supervisors",
  initialState: {
    data: [],
    loading: false,
    error: "",
  },
  extraReducers(builder) {
    builder

      .addCase(getSupervisor.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSupervisor.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.data = action.payload;
      })
      .addCase(getSupervisor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = [];
      });
  },
});

export default supervisorSlice.reducer;
