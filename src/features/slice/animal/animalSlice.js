import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'
import { toast } from 'react-toastify'
import { Exception } from 'sass'

const axiosInstance = createAxiosInstance()

export const getAnimalActive = createAsyncThunk(
  'animals/getAnimalActive',
  async (id) => {
    try {
      const { data } = await axiosInstance.get(
        `/LiveStock/ExternalId/Field(${id})`
      )
      return data
    } catch (error) {
      throw Exception(error)
    }
  }
)

export const createAnimal = createAsyncThunk(
  'animals/createAnimal',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/Livestock', data)
      if (response.status === 200) {
        toast.success('Thêm mới thành công')
      }
      return response.data.data
    } catch (error) {
      toast.error(error.response.data.message)
      rejectWithValue(error)
    }
  }
)

export const updateAnimal = createAsyncThunk(
  'animals/updateAnimal',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/Livestock/${data.id}`, data)
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

export const deleteAnimal = createAsyncThunk(
  'animals/deleteAnimal',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/Livestock/Delete/${id}`)
      if (response.status === 200) {
        toast.success('Đổi trạng thái thành công')
      }
      return response.data
    } catch (error) {
      toast.error(error.response.data.message)
      return rejectWithValue(error)
    }
  }
)

const animalSlice = createSlice({
  name: 'animal',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  reducers: {
    clearAnimal: (state) => {
      state.data = null
    },
  },
  extraReducers(builder) {
    builder
      // getAnimalActive
      .addCase(getAnimalActive.pending, (state) => {
        state.loading = true
      })
      .addCase(getAnimalActive.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getAnimalActive.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })

      .addCase(createAnimal.pending, (state) => {
        state.loading = true
      })
      .addCase(createAnimal.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(createAnimal.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(updateAnimal.pending, (state) => {
        state.loading = true
      })
      .addCase(updateAnimal.fulfilled, (state, action) => {
        state.loading = false
        state.data = [action.payload]
      })
      .addCase(updateAnimal.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(deleteAnimal.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteAnimal.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(deleteAnimal.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default animalSlice.reducer
export const { clearAnimal } = animalSlice.actions
