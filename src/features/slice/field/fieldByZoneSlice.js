import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const getFieldByZone = createAsyncThunk(
  'fieldPlant/getFieldByZonePlant',
  async (zoneId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/Field/Active/Zone(${zoneId})`)
      return data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

const fieldByZoneSlice = createSlice({
  name: 'fieldByZone',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder

      .addCase(getFieldByZone.pending, (state) => {
        state.loading = true
      })
      .addCase(getFieldByZone.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getFieldByZone.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default fieldByZoneSlice.reducer
