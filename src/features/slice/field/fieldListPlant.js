import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const getListPlantInField = createAsyncThunk(
  'fieldListPlant/getListPlantInField',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/Field/${id}/GetPlantByField`)
      return data
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

const fieldListPlantSlice = createSlice({
  name: 'fieldListPlant',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  reducers: {
    clearFieldListPlant: (state) => {
      state.data = null
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getListPlantInField.pending, (state) => {
        state.loading = true
      })
      .addCase(getListPlantInField.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getListPlantInField.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default fieldListPlantSlice.reducer
export const { clearFieldListPlant } = fieldListPlantSlice.actions
