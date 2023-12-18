import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createAxiosInstance } from "features/api/axiosInstance";

const axiosInstance = createAxiosInstance();

export const getZoneByAreaAnimal = createAsyncThunk(
  "zoneAnimal/getZoneByAreaAnimal",
  async (areaId) => {
    try {
      const { data } = await axiosInstance.get(
        `/Zone/AreaLivestock(${areaId})`
      );
      return data;
    } catch (error) {
    }
  }
);

const zoneAnimalSlice = createSlice({
  name: "zoneAnimal",
  initialState: {
    data: [],
    loading: false,
    error: "",
  },
  extraReducers(builder) {
    builder

      .addCase(getZoneByAreaAnimal.pending, (state) => {
        state.loading = true;
      })
      .addCase(getZoneByAreaAnimal.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.data = action.payload;
      })
      .addCase(getZoneByAreaAnimal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = [];
      });
  },
});

export default zoneAnimalSlice.reducer;
