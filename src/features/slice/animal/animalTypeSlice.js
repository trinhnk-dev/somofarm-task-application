import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const getAnimalType = createAsyncThunk(
  'animalTypes/getAnimalTypes',
  async (farmId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/HabitantType/LivestockType/Farm(${farmId})`
      )
      return data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

const animalTypeSlice = createSlice({
  name: 'animalType',
  initialState: {
    data: {},
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder
      .addCase(getAnimalType.pending, (state) => {
        state.loading = true
      })
      .addCase(getAnimalType.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getAnimalType.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default animalTypeSlice.reducer
