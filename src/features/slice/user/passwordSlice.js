import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'
import { toast } from 'react-toastify'

const axiosInstance = createAxiosInstance()

export const resetPassword = createAsyncThunk(
  'password/resetPassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/Email/ForgotPassword?email=${data.email}`,
        data
      )
      if (response.status === 200) {
        toast.success(
          `Vui lòng kiểm tra email ${data.email} để lấy mật khẩu mới`
        )
      }
      return response.data
    } catch (error) {
      toast.error(error.response.data.message)
      rejectWithValue(error)
    }
  }
)

const passwordSlice = createSlice({
  name: 'password',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },

  extraReducers(builder) {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default passwordSlice.reducer
