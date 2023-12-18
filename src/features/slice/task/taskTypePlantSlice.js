import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createAxiosInstance } from "features/api/axiosInstance";

const axiosInstance = createAxiosInstance();

export const getTaskTypePlant = createAsyncThunk(
  "taskTypePlant/getTaskTypePlant",
  async () => {
    try {
      const { data } = await axiosInstance.get("/TaskType/ListTaskTypePlant");
      return data;
    } catch (error) {
    }
  }
);

const taskTypePlantSlice = createSlice({
  name: "taskTypePlant",
  initialState: {
    data: [],
    loading: false,
    error: "",
  },
  extraReducers(builder) {
    builder
      .addCase(getTaskTypePlant.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTaskTypePlant.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.data = action.payload;
      })
      .addCase(getTaskTypePlant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = [];
      });
  },
});

export default taskTypePlantSlice.reducer;
