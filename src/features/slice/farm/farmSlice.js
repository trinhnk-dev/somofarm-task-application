import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'
import { toast } from 'react-toastify'

const axiosInstance = createAxiosInstance()

export const getFarm = createAsyncThunk(
  'farm/getFarm',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get('/Farm')
      return data
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

export const createFarm = createAsyncThunk(
  'farm/createFarm',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/Farm', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (response.status === 200) {
        toast.success('Tạo thành công trang trại')
        return response.data.data
      }
    } catch (error) {
      toast.error(error.response.data.message)
      rejectWithValue(error)
    }
  }
)

export const updateFarm = createAsyncThunk(
  'farm/updateFarm',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/Farm/${data.id}`, data, {
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

export const deleteFarm = createAsyncThunk(
  'farm/deleteFarm',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/Farm/${id}`)
      if (response.status === 200) {
        toast.success(response.data.message)
      }
      return response.data
    } catch (error) {
      toast.error(error.response.data.message)
      return rejectWithValue(error)
    }
  }
)

const farmSlice = createSlice({
  name: 'farm',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },

  extraReducers(builder) {
    builder
      .addCase(getFarm.pending, (state) => {
        state.loading = true
      })
      .addCase(getFarm.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getFarm.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })

      .addCase(createFarm.pending, (state) => {
        state.loading = true
      })
      .addCase(createFarm.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(createFarm.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(updateFarm.pending, (state) => {
        state.loading = true
      })
      .addCase(updateFarm.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(updateFarm.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })

      .addCase(deleteFarm.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteFarm.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(deleteFarm.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default farmSlice.reducer
