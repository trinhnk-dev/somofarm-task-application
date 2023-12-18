import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const getAreaWithZoneTypeLivestock = createAsyncThunk(
  'areaLivestockByZone/getAreaWithZoneTypeLivestock',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/Area/GetAreaWithZoneTypeLiveStock/Farm(${id})`)
      return data
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

const areaLivestockByZoneSlice = createSlice({
  name: 'areaLivestockByZone',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder
      .addCase(getAreaWithZoneTypeLivestock.pending, (state) => {
        state.loading = true
      })
      .addCase(getAreaWithZoneTypeLivestock.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getAreaWithZoneTypeLivestock.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default areaLivestockByZoneSlice.reducer
