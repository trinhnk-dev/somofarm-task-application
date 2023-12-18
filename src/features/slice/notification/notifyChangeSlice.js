import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'
import { baseUrl } from 'features/api/baseUrl'

const axiosInstance = createAxiosInstance()

export const changeAllNotifyNewToRead = createAsyncThunk(
  'notifyChange/changeAllNotifyNewToRead',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/Notification/IsNew/MemberId(${data})`
      )
      return response.json()
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

const notifyChangeSlice = createSlice({
  name: 'notifyChange',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder

      .addCase(changeAllNotifyNewToRead.pending, (state) => {
        state.loading = true
      })
      .addCase(changeAllNotifyNewToRead.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(changeAllNotifyNewToRead.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default notifyChangeSlice.reducer
