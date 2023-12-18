import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const getListAnimalInField = createAsyncThunk(
  'fieldListAnimal/getListAnimalInField',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/Field/${id}/GetLivestockByField`
      )
      return data
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

const fieldListAnimalSlice = createSlice({
  name: 'fieldListAnimal',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  reducers: {
    clearFieldListAnimal: (state) => {
      state.data = null
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getListAnimalInField.pending, (state) => {
        state.loading = true
      })
      .addCase(getListAnimalInField.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getListAnimalInField.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default fieldListAnimalSlice.reducer
export const { clearFieldListAnimal } = fieldListAnimalSlice.actions
