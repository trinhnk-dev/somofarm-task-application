import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const getAllNotify = createAsyncThunk(
  'notification/getAllNotify',
  async ({ pageNumber, pageSize, id }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/Notification/PageIndex(${pageNumber})/PageSize(${pageSize})/Member(${id})`
      )
      return data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    data: [],
    loading: false,
    error: '',
    totalPages: 0,
  },
  reducers: {
    setNotifications(state, action) {
      state.data = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllNotify.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllNotify.fulfilled, (state, action) => {
        state.loading = false
        state.data = [
          ...state.data,
          ...(action.payload.data.notifications || []),
        ]
        state.totalPages = action.payload.data.totalPages
      })
      .addCase(getAllNotify.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { setNotifications } = notificationSlice.actions
export default notificationSlice.reducer
