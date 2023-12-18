import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const getPlantByFarmId = createAsyncThunk(
  'plants/getPlantByFarmId',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/Plant/Farm(${id})`)
      return data
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

export const getPlantActiveByFarmId = createAsyncThunk(
  'animals/getPlantActiveByFarmId',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/Plant/Active/Farm(${id})`)
      return data
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

const plantByFarmSlice = createSlice({
  name: 'plantByFarm',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  reducers: {
    clearPlantByFarm: (state) => {
      state.data = null
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPlantByFarmId.pending, (state) => {
        state.loading = true
      })
      .addCase(getPlantByFarmId.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getPlantByFarmId.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })

      .addCase(getPlantActiveByFarmId.pending, (state) => {
        state.loading = true
      })
      .addCase(getPlantActiveByFarmId.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getPlantActiveByFarmId.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })

    //   .addCase(deleteArea.pending, (state) => {
    //     state.loading = true
    //   })
    //   .addCase(deleteArea.fulfilled, (state, action) => {
    //     state.loading = false
    //     state.data = action.payload
    //   })
    //   .addCase(deleteArea.rejected, (state, action) => {
    //     state.loading = false
    //     state.error = action.payload
    //   })
  },
})

export default plantByFarmSlice.reducer
export const { clearPlantByFarm } = plantByFarmSlice.actions
