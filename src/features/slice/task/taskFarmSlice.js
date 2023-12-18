import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const getTaskFarm = createAsyncThunk(
  'taskFarm/getTaskFarm',
  async (farmId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/FarmTask/GetTotalTaskOfFarm/Farm(${farmId})`
      )
      return data
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

const taskFarmSlice = createSlice({
  name: 'taskFarm',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder

      .addCase(getTaskFarm.pending, (state) => {
        state.loading = true
      })
      .addCase(getTaskFarm.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getTaskFarm.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default taskFarmSlice.reducer
