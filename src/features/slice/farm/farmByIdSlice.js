import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const getFarmById = createAsyncThunk(
  'farmById/getFarmById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/Farm/${id}`)
      return data
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

const farmByIdSlice = createSlice({
  name: 'farmById',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },

  extraReducers(builder) {
    builder
      .addCase(getFarmById.pending, (state) => {
        state.loading = true
      })
      .addCase(getFarmById.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getFarmById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default farmByIdSlice.reducer
