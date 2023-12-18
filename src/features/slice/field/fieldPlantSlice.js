import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const getFieldPlant = createAsyncThunk(
  'fieldPlant/getFieldPlant',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get('/Field/Plant/Active')
      return data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const getFieldPlantByFarmId = createAsyncThunk(
  'fields/getFieldPlantByFarmId',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/Field/Plant/Farm(${id})`)
      return data
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

const fieldPlantSlice = createSlice({
  name: 'fieldPlant',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  reducers: {
    clearFieldPlantByFarm: (state) => {
      state.data = null
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getFieldPlant.pending, (state) => {
        state.loading = true
      })
      .addCase(getFieldPlant.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getFieldPlant.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })

      .addCase(getFieldPlantByFarmId.pending, (state) => {
        state.loading = true
      })
      .addCase(getFieldPlantByFarmId.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getFieldPlantByFarmId.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default fieldPlantSlice.reducer
export const { clearFieldPlantByFarm } = fieldPlantSlice.actions
