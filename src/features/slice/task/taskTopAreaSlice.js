import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const getTopAreaTask = createAsyncThunk(
  'taskTopArea/getTopAreaTask',
  async (farmId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/FarmTask/GetTopAreaHaveTask/Farm(${farmId})`
      )
      return data
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

const taskTopAreaSlice = createSlice({
  name: 'taskTopArea',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers(builder) {
    builder
      .addCase(getTopAreaTask.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getTopAreaTask.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getTopAreaTask.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default taskTopAreaSlice.reducer
