import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const getAreaByFarmId = createAsyncThunk(
  'areas/getAreaByFarmId',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/Area/Farm(${id})`)
      return data
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

export const getAreaActiveByFarmId = createAsyncThunk(
  'areas/getAreaActiveByFarmId',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/Area/Active/Farm(${id})`)
      return data
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

const areaByFarmSlice = createSlice({
  name: 'areaByFarm',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  reducers: {
    clearAreaByFarm: (state) => {
      state.data = null
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAreaByFarmId.pending, (state) => {
        state.loading = true
      })
      .addCase(getAreaByFarmId.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getAreaByFarmId.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })

      .addCase(getAreaActiveByFarmId.pending, (state) => {
        state.loading = true
      })
      .addCase(getAreaActiveByFarmId.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getAreaActiveByFarmId.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default areaByFarmSlice.reducer
export const { clearAreaByFarm } = areaByFarmSlice.actions
