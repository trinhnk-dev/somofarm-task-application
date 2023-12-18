import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const getTaskByWeek = createAsyncThunk(
  'taskByWeek/getTaskByWeek',
  async (memberId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/FarmTask/GetTotalTaskOfWeekByMember(${memberId})`
      )
      return data
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

const taskByWeekSlice = createSlice({
  name: 'taskByWeek',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder

      .addCase(getTaskByWeek.pending, (state) => {
        state.loading = true
      })
      .addCase(getTaskByWeek.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getTaskByWeek.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default taskByWeekSlice.reducer
