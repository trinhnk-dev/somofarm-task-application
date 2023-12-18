import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createAxiosInstance } from "features/api/axiosInstance";
import { authServices } from "services/authServices";

const axiosInstance = createAxiosInstance()

export const getTaskForCalendar = createAsyncThunk('taskForCalendar/getTaskForCalendar', async ({rejectWithValue}) => {
  try {
    const { data } = await axiosInstance.get(`/FarmTask/GetTaskPrepareAndDoing/Member(${authServices.getUserId()})`)
    return data
  } catch (error) {
    rejectWithValue(error.message)
  }
})

const taskForCalendarSlice = createSlice({
  name: "taskForCalendar",
  initialState: {
    data: [],
    loading: false,
    error: "",
    totalPages: 0,
  },
  extraReducers(builder) {
    builder
    .addCase(getTaskForCalendar.pending, (state) => {
      state.loading = true
    })
    .addCase(getTaskForCalendar.fulfilled, (state, action) => {
      state.loading = false
      state.error = ''
      state.data = action.payload
    })
    .addCase(getTaskForCalendar.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.data = []
    })
  },
});

export default taskForCalendarSlice.reducer;
