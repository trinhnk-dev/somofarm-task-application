import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const countNewNotify = createAsyncThunk(
  'notificationCount/countNewNotify',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/Notification/New/Member(${id})/Count`
      )
      return data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

const notificationCountSlice = createSlice({
  name: 'notificationCount',
  initialState: {
    data: [],
    loading: false,
    error: '',
    received: false,
  },
  reducers: {
    updateNotificationReceived: (state, action) => {
      state.received = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(countNewNotify.pending, (state) => {
        state.loading = true
      })
      .addCase(countNewNotify.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(countNewNotify.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { updateNotificationReceived } = notificationCountSlice.actions
export default notificationCountSlice.reducer
