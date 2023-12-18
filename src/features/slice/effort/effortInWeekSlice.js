import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const getEffortInWeek = createAsyncThunk(
  'effortInWeek/getEffortInWeek',
  async (farmId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/FarmTask/GetTotalInWeek/Farm(${farmId})`
      )
      return data
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

const effortInWeekSlice = createSlice({
  name: 'effortInWeek',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers(builder) {
    builder
      .addCase(getEffortInWeek.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getEffortInWeek.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getEffortInWeek.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default effortInWeekSlice.reducer
