import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'
import { toast } from 'react-toastify'

const axiosInstance = createAxiosInstance()

export const getTaskType = createAsyncThunk(
  'taskType/getTaskType',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get('/TaskType')
      return data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const createTaskType = createAsyncThunk(
  'taskType/createTaskType',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/TaskType', data)
      if (response.status === 200) {
        toast.success('Thêm mới thành công')
        return response.data.data
      }
    } catch (error) {
      toast.error(error.response.data.message)
      rejectWithValue(error)
    }
  }
)

export const updateTaskType = createAsyncThunk(
  'taskType/updateTaskType',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/TaskType/${data.id}`, data)
      if (response.status === 200) {
        toast.success('Cập nhật thành công')
      }
      return response.json()
    } catch (error) {
      toast.error(error.response.data.message)
      rejectWithValue(error)
    }
  }
)

export const deleteTaskType = createAsyncThunk(
  'taskType/deleteTaskType',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/TaskType/${id}`)
      if (response.status === 200) {
        toast.success('Xoá thành công')
      }
      return response.data
    } catch (error) {
      toast.error(error.response.data)
      return rejectWithValue(error)
    }
  }
)

const taskTypeSlice = createSlice({
  name: 'taskType',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder
      .addCase(getTaskType.pending, (state) => {
        state.loading = true
      })
      .addCase(getTaskType.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getTaskType.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })

      .addCase(createTaskType.pending, (state) => {
        state.loading = true
      })
      .addCase(createTaskType.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(createTaskType.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(updateTaskType.pending, (state) => {
        state.loading = true
      })
      .addCase(updateTaskType.fulfilled, (state, action) => {
        state.loading = false
        state.data = [action.payload]
      })
      .addCase(updateTaskType.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(deleteTaskType.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteTaskType.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(deleteTaskType.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default taskTypeSlice.reducer
