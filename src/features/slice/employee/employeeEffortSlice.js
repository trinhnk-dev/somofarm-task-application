import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const getEmployeeEffortExcel = createAsyncThunk(
  'employeeEffort/getEmployeeEffortExcel',
  async (data, { rejectWithValue }) => {
    try {
      axiosInstance.defaults.headers.common['Accept'] =
        'application/vnd.ms-excel'

      const response = await axiosInstance.get(
        `/Employee/Effort/Farm(${data.farmId})?month=${data.month}&year=${data.year}`,
        {
          responseType: 'blob',
        }
      )

      const url = window.URL.createObjectURL(new Blob([response.data]))

      const link = document.createElement('a')
      link.href = url
      link.setAttribute(
        'download',
        `ChiTietGioLam${data.month}Nam${data.year}.xlsx`
      )
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)

      return response.data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const getEmployeeEffortByEmployeeId = createAsyncThunk(
  'employeeEffort/getEmployeeEffortByEmployeeId',
  async (data, { rejectWithValue }) => {
    try {
      axiosInstance.defaults.headers.common['Accept'] =
        'application/vnd.ms-excel'

      const response = await axiosInstance.get(
        `/Employee/Effort/Employee(${data.employeeId})?month=${data.month}&year=${data.year}`,
        {
          responseType: 'blob',
        }
      )

      const url = window.URL.createObjectURL(new Blob([response.data]))

      const link = document.createElement('a')
      link.href = url
      link.setAttribute(
        'download',
        `ChiTietGioLam - ${data.month}|${data.year} - ${data.code}.xlsx`
      )
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)

      return response.data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

const employeeEffortSlice = createSlice({
  name: 'employeeEffort',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder

      .addCase(getEmployeeEffortExcel.pending, (state) => {
        state.loading = true
      })
      .addCase(getEmployeeEffortExcel.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getEmployeeEffortExcel.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })

      .addCase(getEmployeeEffortByEmployeeId.pending, (state) => {
        state.loading = true
      })
      .addCase(getEmployeeEffortByEmployeeId.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getEmployeeEffortByEmployeeId.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default employeeEffortSlice.reducer
