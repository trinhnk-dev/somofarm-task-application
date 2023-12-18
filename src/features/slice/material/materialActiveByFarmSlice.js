import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createAxiosInstance } from "features/api/axiosInstance";

const axiosInstance = createAxiosInstance();

export const getMaterialActiveByFarmId = createAsyncThunk(
  "materialsActiveByFarmId/getMaterialActiveByFarmId",
  async (farmId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/Material/Active/Farm(${farmId})`
      );
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const materialActiveByFarmSlice = createSlice({
  name: "materialActive",
  initialState: {
    data: [],
    loading: false,
    error: "",
  },
  extraReducers(builder) {
    builder

      .addCase(getMaterialActiveByFarmId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMaterialActiveByFarmId.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.data = action.payload;
      })
      .addCase(getMaterialActiveByFarmId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = [];
      });
  },
});

export default materialActiveByFarmSlice.reducer;
