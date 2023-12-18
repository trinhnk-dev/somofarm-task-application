import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createAxiosInstance } from "features/api/axiosInstance";

const axiosInstance = createAxiosInstance()

export const getEmployeeByTask = createAsyncThunk('employeeByTask/getEmployeeByTask', async (taskId) => {
    try {
      const { data } = await axiosInstance.get(`/Activities/EmployeeNoActivities(${taskId})`)
      return data
    } catch (error) {
    }
  })

  const employeeByTaskSlice = createSlice({
    name: "activity",
    initialState: {
      data: [],
      loading: false,
      error: "",
    },
    extraReducers(builder) {
      builder
        .addCase(getEmployeeByTask.pending, (state) => {
          state.loading = true;
        })
        .addCase(getEmployeeByTask.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(getEmployeeByTask.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
    },
  });

  export default employeeByTaskSlice.reducer;
