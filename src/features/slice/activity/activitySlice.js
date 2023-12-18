import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createAxiosInstance } from "features/api/axiosInstance";
import { toast } from "react-toastify";

const axiosInstance = createAxiosInstance();

export const getActivityByTaskId = createAsyncThunk(
  "activity/getActivityByTaskId",
  async (taskId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/Activities/Task(${taskId})`);

      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

const activitySlice = createSlice({
  name: "activity",
  initialState: {
    data: [],
    loading: false,
    error: "",
  },
  extraReducers(builder) {
    builder
      .addCase(getActivityByTaskId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getActivityByTaskId.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getActivityByTaskId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default activitySlice.reducer;
