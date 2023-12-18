import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'
import { baseUrl } from 'features/api/baseUrl'

const axiosInstance = createAxiosInstance()

export const getNotifyIsNewById = createAsyncThunk(
  'notificationIsNew/getNotifyIsNewById',
  async ({ pageNumber, pageSize, id }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/Notification/PageIndex(${pageNumber})/PageSize(${pageSize})/NotSeen/Member${id}`
      )
      return data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

const notificationIsNewSlice = createSlice({
  name: 'notificationIsNew',
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
      .addCase(getNotifyIsNewById.pending, (state) => {
        state.loading = true
      })
      .addCase(getNotifyIsNewById.fulfilled, (state, action) => {
        state.loading = false
        state.data = [
          ...state.data,
          ...(action.payload.data.notifications || []),
        ]
        state.totalPages = action.payload.data.totalPages
      })
      .addCase(getNotifyIsNewById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { setNotifications } = notificationIsNewSlice.actions
export default notificationIsNewSlice.reducer
