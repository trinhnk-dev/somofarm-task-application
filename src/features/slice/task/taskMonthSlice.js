import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const getTaskMonth = createAsyncThunk(
  'taskMonth/getTaskMonth',
  async ({ farmId, month }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/FarmTask/GetTotalTaskOfFarmIncurrentMonth/Farm(${farmId})?month=${month}`
      )
      return data
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

const taskMonthSlice = createSlice({
  name: 'taskMonth',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder

      .addCase(getTaskMonth.pending, (state) => {
        state.loading = true
      })
      .addCase(getTaskMonth.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getTaskMonth.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default taskMonthSlice.reducer
