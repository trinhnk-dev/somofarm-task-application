import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const getTaskTypeTemplate = createAsyncThunk(
  'taskTypeTemplate/getTaskTypeTemplate',
  async (_, { rejectWithValue }) => {
    try {
      axiosInstance.defaults.headers.common['Accept'] =
        'application/vnd.ms-excel'
      const response = await axiosInstance.get('/TaskType/Template', {
        responseType: 'blob',
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))

      const link = document.createElement('a')
      link.href = url

      link.setAttribute('download', 'TaskTypeTemplate.xlsx')

      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)

      return response.data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

const taskTypeTemplateSlice = createSlice({
  name: 'taskTypeTemplate',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder
      .addCase(getTaskTypeTemplate.pending, (state) => {
        state.loading = true
      })
      .addCase(getTaskTypeTemplate.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getTaskTypeTemplate.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })

    //   .addCase(createTaskType.pending, (state) => {
    //     state.loading = true
    //   })
    //   .addCase(createTaskType.fulfilled, (state, action) => {
    //     state.loading = false
    //     state.data = [action.payload]
    //   })
    //   .addCase(createTaskType.rejected, (state, action) => {
    //     state.loading = false
    //     state.error = action.payload
    //   })
  },
})

export default taskTypeTemplateSlice.reducer
