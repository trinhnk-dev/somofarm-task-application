import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const getMaterialById = createAsyncThunk(
  'materialById/getMaterialById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/Material/${id}`)
      return data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

const materialByIdSlice = createSlice({
  name: 'materialById',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder

      .addCase(getMaterialById.pending, (state) => {
        state.loading = true
      })
      .addCase(getMaterialById.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getMaterialById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default materialByIdSlice.reducer
