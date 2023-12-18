import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'
import { toast } from 'react-toastify'

const axiosInstance = createAxiosInstance()

export const createHabitantType = createAsyncThunk(
  'habitantType/createHabitantType',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/HabitantType', data)
      if (response.status === 200) {
        toast.success('Thêm mới thành công')
        return response.data
      }
    } catch (error) {
      toast.error(error.response.data.message)
      rejectWithValue(error)
    }
  }
)

export const updateHabitantType = createAsyncThunk(
  'habitantType/updateHabitantType',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/HabitantType/${data.id}`, data)
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

export const deleteHabitantType = createAsyncThunk(
  'habitantType/deleteHabitantType',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/HabitantType/Delete/${id}`)
      if (response.status === 200) {
        toast.success('Đổi trạng thái thành công')
        return response.data
      }
    } catch (error) {
      toast.error(error.response.data.message)
      return rejectWithValue(error)
    }
  }
)
const habitantTypeSlice = createSlice({
  name: 'habitantType',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  reducers: {
    clearHabitantType: (state) => {
      state.data = null
    },
  },
  extraReducers(builder) {
    builder

      .addCase(createHabitantType.pending, (state) => {
        state.loading = true
      })
      .addCase(createHabitantType.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(createHabitantType.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(updateHabitantType.pending, (state) => {
        state.loading = true
      })
      .addCase(updateHabitantType.fulfilled, (state, action) => {
        state.loading = false
        state.data = [action.payload]
      })
      .addCase(updateHabitantType.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(deleteHabitantType.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteHabitantType.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(deleteHabitantType.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default habitantTypeSlice.reducer
export const { clearHabitantType } = habitantTypeSlice.actions
