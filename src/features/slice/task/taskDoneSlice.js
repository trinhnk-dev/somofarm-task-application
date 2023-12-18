import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const getTaskDoneByEmployeeId = createAsyncThunk(
  'taskDone/getTaskDoneByEmployeeId',
  async (
    { pageIndex, employeeId, startDay, endDay, status },
    { rejectWithValue }
  ) => {
    try {
      const url = new URL(
        `/api/FarmTask/PageIndex(${pageIndex})/PageSize(10)/Done/Employee(${employeeId})`,
        axiosInstance.defaults.baseURL
      )

      if (startDay != null) url.searchParams.append('startDay', startDay)
      if (endDay != null) url.searchParams.append('endDay', endDay)
      if (status != null) url.searchParams.append('status', status)

      const { data } = await axiosInstance.get(url.href)
      return data
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

const taskDoneSlice = createSlice({
  name: 'taskDone',
  initialState: {
    data: [],
    loading: false,
    error: '',
    totalPages: 0,
  },
  reducers: {
    clearTaskDone: (state) => {
      state.data = []
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTaskDoneByEmployeeId.pending, (state) => {
        state.loading = true
      })
      .addCase(getTaskDoneByEmployeeId.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = [
          ...state.data,
          ...(action.payload.data.taskByEmployeeDates || []),
        ]
        state.totalPages = action.payload.data.totalPages
      })
      .addCase(getTaskDoneByEmployeeId.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default taskDoneSlice.reducer
export const { clearTaskDone } = taskDoneSlice.actions
