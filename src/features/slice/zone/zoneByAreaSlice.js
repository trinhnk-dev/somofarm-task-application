import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const getZoneByAreaId = createAsyncThunk(
  'zonesByAreaId/getZoneByAreaId',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/Zone/Active/Area(${id})`)
      return data
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

const zoneByAreaSlice = createSlice({
  name: 'zoneByArea',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  reducers: {
    clearZoneByArea: (state) => {
      state.data = null
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getZoneByAreaId.pending, (state) => {
        state.loading = true
      })
      .addCase(getZoneByAreaId.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getZoneByAreaId.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default zoneByAreaSlice.reducer
export const { clearZoneByArea } = zoneByAreaSlice.actions
