import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'
import { toast } from 'react-toastify'
import { authServices } from 'services/authServices'

const axiosInstance = createAxiosInstance()

export const createHub = createAsyncThunk(
  'hub/createHubConnection',
  async (data, { rejectWithValue }) => {
    const finalData = {
      memberId: authServices.getUserId(),
      connectionId: data,
    }
    try {
      const response = await axiosInstance.post('/HubConnection', finalData)
      if (response.status === 200) {
        return response.data.data
      }
    } catch (error) {
      toast.error(error.response.data.message)
      rejectWithValue(error)
    }
  }
)

export const deleteHubConnection = createAsyncThunk(
  'hub/deleteHubConnection',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/HubConnection`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      })
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

const hubSlice = createSlice({
  name: 'hub',
  initialState: {
    data: {},
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder

      .addCase(createHub.pending, (state) => {
        state.loading = true
      })
      .addCase(createHub.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(createHub.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(deleteHubConnection.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteHubConnection.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(deleteHubConnection.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default hubSlice.reducer
