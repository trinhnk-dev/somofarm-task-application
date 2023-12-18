import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const getTaskTypeActive = createAsyncThunk(
  'taskTypeActive/getTaskTypeActive',
  async () => {
    try {
      const { data } = await axiosInstance.get('/TaskType/Active')
      return data
    } catch (error) {
    }
  }
)

const taskTypeActiveSlice = createSlice({
  name: 'taskTypeActive',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder
      .addCase(getTaskTypeActive.pending, (state) => {
        state.loading = true
      })
      .addCase(getTaskTypeActive.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getTaskTypeActive.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default taskTypeActiveSlice.reducer
