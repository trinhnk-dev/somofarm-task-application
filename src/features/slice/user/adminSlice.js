import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createAxiosInstance } from "features/api/axiosInstance";
import { toast } from "react-toastify";

const axiosInstance = createAxiosInstance();

export const getAdminById = createAsyncThunk(
  "admin/getAdminById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/Member/${id}/GetAdminById`);
      return response.data.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const adminSlice = createSlice({
    name: "admin",
    initialState: {
      data: [],
      loading: false,
      error: "",
    },
    reducers: {
      clearMember: (state) => {
        state.data = null;
      },
    },
  
    extraReducers(builder) {
      builder
  
        .addCase(getAdminById.pending, (state) => {
          state.loading = true;
        })
        .addCase(getAdminById.fulfilled, (state, action) => {
          state.loading = false;
          state.error = "";
          state.data = action.payload;
        })
        .addCase(getAdminById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.data = [];
        })
    },
  });
  
  export default adminSlice.reducer;