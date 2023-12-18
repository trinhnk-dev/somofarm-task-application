import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'
import { toast } from 'react-toastify'

const axiosInstance = createAxiosInstance()

export const getMemberByFarmId = createAsyncThunk(
  'memberByFarm/getMemberByFarmId',
  async (farmId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/Member/Farm(${farmId})`)
      return data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)



const memberByFarmSlice = createSlice({
  name: 'memberByFarm',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  //   reducers: {
  //     clearMember: (state) => {
  //       state.data = null
  //     },
  //   },

  extraReducers(builder) {
    builder

      .addCase(getMemberByFarmId.pending, (state) => {
        state.loading = true
      })
      .addCase(getMemberByFarmId.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getMemberByFarmId.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default memberByFarmSlice.reducer
// export const { clearMember } = memberSlice.actions
