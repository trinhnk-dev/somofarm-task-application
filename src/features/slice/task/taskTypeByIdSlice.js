import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createAxiosInstance } from "features/api/axiosInstance";

const axiosInstance = createAxiosInstance();

export const getTaskTypeById = createAsyncThunk(
  "taskTypeById/getTaskTypeById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/TaskType/${id}`);
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const taskTypeByIdSlice = createSlice({
  name: "taskType",
  initialState: {
    data: [],
    loading: false,
    error: "",
  },
  extraReducers(builder) {
    builder
      .addCase(getTaskTypeById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTaskTypeById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getTaskTypeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = [];
      });
  },
});

export default taskTypeByIdSlice.reducer;
