import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getCities = createAsyncThunk('location/getCities', async () => {
  const response = await axios.get('https://provinces.open-api.vn/api/?depth=1')
  return response.data
})

export const getDistrict = createAsyncThunk(
  'location/getDistrict',
  async (cityCode) => {
    const response = await axios.get(
      `https://provinces.open-api.vn/api/p/${cityCode}?depth=2`
    )
    return response.data.districts
  }
)

export const getWard = createAsyncThunk(
  'location/getWard',
  async (districtCode) => {
    const response = await axios.get(
      `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
    )
    return response.data.wards
  }
)

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    cities: [],
    districts: [],
    wards: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCities.fulfilled, (state, action) => {
        state.cities = action.payload
      })
      .addCase(getDistrict.fulfilled, (state, action) => {
        state.districts = action.payload
      })
      .addCase(getWard.fulfilled, (state, action) => {
        state.wards = action.payload
      })
  },
})

export const selectCities = (state) => state.location.cities
export const selectDistricts = (state) => state.location.districts
export const selectWards = (state) => state.location.wards
export default locationSlice.reducer
