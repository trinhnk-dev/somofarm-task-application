import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const changeNotifyIsRead = createAsyncThunk(
  'notificationRead/changeNotifyIsRead',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/Notification/IsRead(${data})`)
      return response.json()
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const changeNotifyIsReadAll = createAsyncThunk(
  'notificationRead/changeNotifyIsReadAll',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/Notification/All/IsRead/Member(${data})`
      )
      if (response.status === 200) {
      }
      return response.json()
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

const notificationReadSlice = createSlice({
  name: 'notificationRead',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },

  extraReducers(builder) {
    builder
      .addCase(changeNotifyIsRead.pending, (state) => {
        state.loading = true
      })
      .addCase(changeNotifyIsRead.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(changeNotifyIsRead.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(changeNotifyIsReadAll.pending, (state) => {
        state.loading = true
      })
      .addCase(changeNotifyIsReadAll.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(changeNotifyIsReadAll.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default notificationReadSlice.reducer
