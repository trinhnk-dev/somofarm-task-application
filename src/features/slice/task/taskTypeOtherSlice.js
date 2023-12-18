import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const getTaskTypeActiveOther = createAsyncThunk('taskTypeActive/getTaskTypeActive', async () => {
    try {
      const { data } = await axiosInstance.get('/TaskType/ListTaskTypeOther')
      return data
    } catch (error) {
    }
  })

  const taskTypeActiveOtherSlice = createSlice({
    name: 'taskTypeActiveOther',
    initialState: {
      data: [],
      loading: false,
      error: '',
    },
    extraReducers(builder) {
      builder
        .addCase(getTaskTypeActiveOther.pending, (state) => {
          state.loading = true
        })
        .addCase(getTaskTypeActiveOther.fulfilled, (state, action) => {
          state.loading = false
          state.error = ''
          state.data = action.payload
        })
        .addCase(getTaskTypeActiveOther.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload
          state.data = []
        })
    },
  })

  export default taskTypeActiveOtherSlice.reducer