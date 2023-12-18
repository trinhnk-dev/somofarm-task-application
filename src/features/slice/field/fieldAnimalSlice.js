import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const getFieldAnimal = createAsyncThunk(
  'fieldAnimal/getFieldAnimal',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get('/Field/Livestock/Active')
      return data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const getFieldAnimalByFarmId = createAsyncThunk(
  'fieldAnimal/getFieldLivestockByFarmId',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/Field/Livestock/Farm(${id})`)
      return data
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

const fieldAnimalSlice = createSlice({
  name: 'fieldAnimal',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  reducers: {
    clearFieldAnimalByFarm: (state) => {
      state.data = null
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getFieldAnimal.pending, (state) => {
        state.loading = true
      })
      .addCase(getFieldAnimal.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getFieldAnimal.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })

      .addCase(getFieldAnimalByFarmId.pending, (state) => {
        state.loading = true
      })
      .addCase(getFieldAnimalByFarmId.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getFieldAnimalByFarmId.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default fieldAnimalSlice.reducer
export const { clearFieldAnimalByFarm } = fieldAnimalSlice.actions
