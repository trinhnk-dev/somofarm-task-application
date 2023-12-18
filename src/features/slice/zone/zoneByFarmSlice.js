import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const getZoneByFarmId = createAsyncThunk(
  'zones/getZoneByFarmId',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/Zone/Farm(${id})`)
      return data
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

const zoneByFarmSlice = createSlice({
  name: 'zoneByFarm',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  reducers: {
    clearZoneByFarm: (state) => {
      state.data = null
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getZoneByFarmId.pending, (state) => {
        state.loading = true
      })
      .addCase(getZoneByFarmId.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getZoneByFarmId.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default zoneByFarmSlice.reducer
export const { clearZoneByFarm } = zoneByFarmSlice.actions
