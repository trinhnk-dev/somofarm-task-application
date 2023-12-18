import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const getAnimalByFarmId = createAsyncThunk(
  'animals/getAnimalByFarmId',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/LiveStock/Farm(${id})`)
      return data
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

export const getAnimalActiveByFarmId = createAsyncThunk(
  'animals/getAnimalActiveByFarmId',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/LiveStock/Active/Farm(${id})`
      )
      return data
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

const animalByFarmSlice = createSlice({
  name: 'animalByFarm',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  reducers: {
    clearAnimalByFarm: (state) => {
      state.data = null
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAnimalByFarmId.pending, (state) => {
        state.loading = true
      })
      .addCase(getAnimalByFarmId.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getAnimalByFarmId.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })

      .addCase(getAnimalActiveByFarmId.pending, (state) => {
        state.loading = true
      })
      .addCase(getAnimalActiveByFarmId.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getAnimalActiveByFarmId.rejected, (state, action) => {
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

export default animalByFarmSlice.reducer
export const { clearAnimalByFarm } = animalByFarmSlice.actions
