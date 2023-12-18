import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const getEmployeeEffortTotal = createAsyncThunk(
  'employeeEffortTotal/getEmployeeEffortTotal',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/Activities/Employee(${id})/TotalEffort`
      )
      return data
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

const employeeEffortTotalSlice = createSlice({
  name: 'employeeEffortTotal',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder

      .addCase(getEmployeeEffortTotal.pending, (state) => {
        state.loading = true
      })
      .addCase(getEmployeeEffortTotal.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getEmployeeEffortTotal.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default employeeEffortTotalSlice.reducer
