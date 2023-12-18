import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'
import { toast } from 'react-toastify'

const axiosInstance = createAxiosInstance()

export const getEmployeeById = createAsyncThunk(
  'employee/getEmployeeById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/Employee/${id}`)
      return data
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

export const createEmployee = createAsyncThunk(
  'employee/createEmployee',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/Employee', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (response.status === 200) {
        toast.success('Thêm nhân viên thành công')
        return response.data.data
      }
    } catch (error) {
      toast.error(error.response.data.message)
      rejectWithValue(error)
    }
  }
)

export const updateEmployee = createAsyncThunk(
  'employee/updateEmployee',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/Employee/${data.id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (response.status === 200) {
        toast.success('Cập nhật thành công')
        return response.data.data
      }
    } catch (error) {
      toast.error(error.response.data.message)
      rejectWithValue(error)
    }
  }
)

export const deleteEmployee = createAsyncThunk(
  'employee/deleteEmployee',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/Employee/ChangeStatus/${id}`)
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

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder

      .addCase(getEmployeeById.pending, (state) => {
        state.loading = true
      })
      .addCase(getEmployeeById.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getEmployeeById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })

      .addCase(createEmployee.pending, (state) => {
        state.loading = true
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(updateEmployee.pending, (state) => {
        state.loading = true
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default employeeSlice.reducer
