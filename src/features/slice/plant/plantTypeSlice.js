import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const getPlantType = createAsyncThunk(
  'plantType/getPlantTypes',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/HabitantType/PlantType/Farm(${id})`
      )
      return data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

const plantTypeSlice = createSlice({
  name: 'plantType',
  initialState: {
    data: {},
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder
      .addCase(getPlantType.pending, (state) => {
        state.loading = true
      })
      .addCase(getPlantType.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getPlantType.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default plantTypeSlice.reducer
