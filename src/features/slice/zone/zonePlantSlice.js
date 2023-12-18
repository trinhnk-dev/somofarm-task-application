import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const getZoneByAreaPlant = createAsyncThunk(
  'zonePlant/getZoneByAreaPlant',
  async (areaId) => {
    try {
      const { data } = await axiosInstance.get(`/Zone/AreaPlant(${areaId})`)
      return data
    } catch (error) {
    }
  }
)

const zonePlantSlice = createSlice({
  name: 'zonePlant',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder
      .addCase(getZoneByAreaPlant.pending, (state) => {
        state.loading = true
      })
      .addCase(getZoneByAreaPlant.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getZoneByAreaPlant.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default zonePlantSlice.reducer
