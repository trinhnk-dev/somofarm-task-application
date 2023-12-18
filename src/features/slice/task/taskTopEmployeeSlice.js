import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const getTaskTopEmployee = createAsyncThunk(
  'taskTopEmployee/getTaskTopEmployee',
  async (farmId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/FarmTask/TopEmployee/Farm(${farmId})`
      )
      return data
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

const taskTopEmployeeSlice = createSlice({
  name: 'taskTopEmployee',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers(builder) {
    builder
      .addCase(getTaskTopEmployee.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getTaskTopEmployee.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getTaskTopEmployee.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default taskTopEmployeeSlice.reducer
