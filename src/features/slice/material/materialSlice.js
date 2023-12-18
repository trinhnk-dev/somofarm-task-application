import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'
import { toast } from 'react-toastify'

const axiosInstance = createAxiosInstance()

export const getMaterialByFarmId = createAsyncThunk(
  'materials/getMaterials',
  async (farmId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/Material/Farm(${farmId})`)
      return data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const createMaterial = createAsyncThunk(
  'materials/createMaterial',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/Material', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (response.status === 200) {
        toast.success('Thêm mới thành công')
        return response.data.data
      }
    } catch (error) {
      toast.error(error.response.data.message)
      rejectWithValue(error)
    }
  }
)

export const updateMaterial = createAsyncThunk(
  'materials/updateMaterial',
  async (data, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const response = await axiosInstance.put(
        `/Material/${data.id}`,
        data,
        config
      )

      if (response.status === 200) {
        toast.success('Cập nhật thành công')
      }
      return response.json()
    } catch (error) {
      toast.error(error.response.data.message)
      rejectWithValue(error)
    }
  }
)

export const deleteMaterial = createAsyncThunk(
  'materials/deleteMaterial',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/Material/Delete/${id}`)
      if (response.status === 200) {
        toast.success('Đổi trạng thái thành công')
        return response.data
      }
    } catch (error) {
      toast.error(error.response.data.message)
      return rejectWithValue(error)
    }
  }
)

export const adminDeleteMaterial = createAsyncThunk(
  'materials/adminDeleteMaterial',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/Material/${id}`)
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

const materialSlice = createSlice({
  name: 'material',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  reducers: {
    setMaterialData: (state, action) => {
      state.data = action.payload
    },
  },
  extraReducers(builder) {
    builder

      .addCase(getMaterialByFarmId.pending, (state) => {
        state.loading = true
      })
      .addCase(getMaterialByFarmId.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getMaterialByFarmId.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })

      .addCase(createMaterial.pending, (state) => {
        state.loading = true
      })
      .addCase(createMaterial.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(createMaterial.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(updateMaterial.pending, (state) => {
        state.loading = true
      })
      .addCase(updateMaterial.fulfilled, (state, action) => {
        state.loading = false
        state.data = [action.payload]
      })
      .addCase(updateMaterial.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(deleteMaterial.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteMaterial.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(deleteMaterial.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(adminDeleteMaterial.pending, (state) => {
        state.loading = true
      })
      .addCase(adminDeleteMaterial.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(adminDeleteMaterial.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default materialSlice.reducer
export const { setMaterialData } = materialSlice.actions
