import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'
import { toast } from 'react-toastify'

const axiosInstance = createAxiosInstance()

export const getMemberById = createAsyncThunk(
  'member/getMemberById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/Member/${id}`)
      return response.data.data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const createMember = createAsyncThunk(
  'member/createMember',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/Member', data, {
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

export const updateMember = createAsyncThunk(
  'member/updateMember',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/Member/${data.id}`, data.body, {
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

export const updatePassword = createAsyncThunk(
  'member/updatePassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/Member/${data.id}/UpdatePassword`,
        data
      )
      if (response.status === 200) {
        toast.success('Đổi mật khẩu thành công')
        return response.data.data
      }
    } catch (error) {
      toast.error(error.response.data.message)
      rejectWithValue(error)
    }
  }
)

export const adminDeleteMember = createAsyncThunk(
  'member/adminDeleteMember',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/Member/${id}`)
      if (response.status === 200) {
        toast.success('Xoá thành công')
        return response.data
      }
    } catch (error) {
      toast.error(error.response.data.message)
      return rejectWithValue(error)
    }
  }
)

const memberSlice = createSlice({
  name: 'member',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  reducers: {
    clearMember: (state) => {
      state.data = null
    },
  },

  extraReducers(builder) {
    builder

      .addCase(getMemberById.pending, (state) => {
        state.loading = true
      })
      .addCase(getMemberById.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getMemberById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })

      .addCase(createMember.pending, (state) => {
        state.loading = true
      })
      .addCase(createMember.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(createMember.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(updateMember.pending, (state) => {
        state.loading = true
      })
      .addCase(updateMember.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(updateMember.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })

      .addCase(updatePassword.pending, (state) => {
        state.loading = true
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })

      .addCase(adminDeleteMember.pending, (state) => {
        state.loading = true
      })
      .addCase(adminDeleteMember.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(adminDeleteMember.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default memberSlice.reducer
export const { clearMember } = memberSlice.actions
