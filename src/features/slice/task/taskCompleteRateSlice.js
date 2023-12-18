import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const getTaskCompleteRate = createAsyncThunk(
  'taskCompleteRate/getTaskCompleteRate',
  async (farmId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/FarmTask/CompletionRate/Farm(${farmId})`
      )
      return data
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

const taskCompleteRateSlice = createSlice({
  name: 'taskCompleteRate',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers(builder) {
    builder
      .addCase(getTaskCompleteRate.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getTaskCompleteRate.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getTaskCompleteRate.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default taskCompleteRateSlice.reducer
