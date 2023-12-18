import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createAxiosInstance } from "features/api/axiosInstance";
import { toast } from "react-toastify";
import { authServices } from "services/authServices";

const axiosInstance = createAxiosInstance();

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (
    { pageIndex, status, date, taskName, checkTaskParent },
    { rejectWithValue }
  ) => {
    try {
      const formattedDate = date ? date.format("YYYY-MM-DD[T]HH:mm:ss") : "";
      const { data } = await axiosInstance.get(
        `/FarmTask/PageIndex(${pageIndex})/PageSize(10)/Manager(${authServices.getUserId()})/Status(${status})/Date?date=${formattedDate}&taskName=${taskName}&checkTaskParent=${checkTaskParent}`
      );
      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const createTaskToDo = createAsyncThunk(
  "tasks/createTaskToDo",
  async (data) => {
    try {
      const response = await axiosInstance.post(
        "/FarmTask/CreateTaskToDo",
        data
      );
      if (response.status === 200) {
        toast.success("Thêm công việc thành công");
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const createTaskDraft = createAsyncThunk(
  "tasks/createTaskDraft",
  async (data) => {
    try {
      const response = await axiosInstance.post(
        "/FarmTask/CreateTaskDraft",
        data
      );
      if (response.status === 200) {
        toast.success("Thêm công việc thành công");
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const createTaskClone = createAsyncThunk(
  "tasks/createTaskClone",
  async (id) => {
    try {
      const response = await axiosInstance.post(
        `/FarmTask/(${id})/CreateTaskClone`
      );
      if (response.status === 200) {
        toast.success("Tạo bản sao thành công");
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/FarmTask/(${data.taskId})/UpdateTask`,
        data.body
      );
      if (response.status === 200) {
        toast.success("Cập nhật thành công");
      }
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error);
    }
  }
);

export const updateTaskDraftToPrepare = createAsyncThunk(
  "task/updateTaskDraftToPrepare",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/FarmTask/(${data.taskId})/UpdateTaskDraftAndToPrePare`,
        data.body
      );
      if (response.status === 200) {
        toast.success("Cập nhật thành công");
      }
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error);
    }
  }
);

export const updateStatusFromToDoToDraft = createAsyncThunk(
  "task/updateStatusFromToDoToDraft",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/FarmTask/(${taskId})/UpdateStatusFromTodoToDraft`
      );
      if (response.status === 200) {
        toast.success("Cập nhật thành công");
      }
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error);
    }
  }
);

export const refuseTask = createAsyncThunk(
  "task/refuseTask",
  async ({taskId, important}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/FarmTask/Task(${taskId})/Refuse?isImportant=${important}`
      );
      if (response.status === 200) {
        toast.success("Cập nhật thành công");
      }
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error);
    }
  }
);

export const changeStatusDoneToClose = createAsyncThunk(
  "task/changeStatusDoneToClose",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/FarmTask/(${taskId})/ChangeStatusToClose`
      );
      if (response.status === 200) {
        toast.success("Cập nhật thành công");
      }
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error);
    }
  }
);

export const changeStatusFromDoneToDoing = createAsyncThunk(
  "task/changeStatusFromDoneToDoing",
  async (data, { rejectWithValue }) => {
    try {
      const formattedDate = data.date ? data.date.format("YYYY-MM-DD[T]HH:mm:ss") : "";
      const response = await axiosInstance.put(
        `/FarmTask/(${
          data.taskId
        })/ChangeStatusFromDoneToDoing?managerId=${authServices.getUserId()}&endDay=${formattedDate}`,
        data.body
      );
      if (response.status === 200) {
        toast.success("Cập nhật thành công");
      }
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error);
    }
  }
);

export const changeStatusToPendingAndCancel = createAsyncThunk(
  "task/changeStatusToPendingAndCancel",
  async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(
        `/FarmTask/(${data.taskId})/changeStatusToPendingAndCancel?status=${
          data.status
        }&managerId=${authServices.getUserId()}`,
        data.body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Cập nhật thành công");
      }

      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error);
    }
  }
);

export const updateTaskDisagreeAndChangeToToDo = createAsyncThunk(
  "task/updateTaskDisagreeAndChangeToToDo",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/FarmTask/(${data.taskId})/updateTaskDisagreeAndChangeToToDo`,
        data.body
      );
      if (response.status === 200) {
        toast.success("Cập nhật thành công");
      }
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error);
    }
  }
);

export const changeStatusToDoing = createAsyncThunk(
  "task/changeStatusToDoing",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/FarmTask/(${taskId})/ChangeStatusToDoing`
      );
      if (response.status === 200) {
        toast.success("Cập nhật thành công");
      }
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/FarmTask/(${id})`);
      if (response.status === 200) {
        toast.success("Xóa thành công");
      }
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error);
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState: {
    data: [],
    loading: false,
    error: "",
    totalPages: 0,
  },
  extraReducers(builder) {
    builder
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.data = action.payload.data.farmTasks || [];
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = [];
      })
      .addCase(createTaskToDo.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTaskToDo.fulfilled, (state, action) => {
        if (Array.isArray(state.data)) {
          state.data.push(action.payload.task);
        } else {
          state.data = [action.payload.task];
        }

        state.loading = false;
      })
      .addCase(createTaskToDo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTaskDraft.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTaskDraft.fulfilled, (state, action) => {
        if (Array.isArray(state.data)) {
          state.data.push(action.payload.task);
        } else {
          state.data = [action.payload.task];
        }

        state.loading = false;
      })
      .addCase(createTaskDraft.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTaskClone.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTaskClone.fulfilled, (state, action) => {
        if (Array.isArray(state.data)) {
          state.data.push(action.payload.task);
        } else {
          state.data = [action.payload.task];
        }

        state.loading = false;
      })
      .addCase(createTaskClone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        if (Array.isArray(state.data)) {
          state.data.push(action.payload.task);
        } else {
          state.data = [action.payload.task];
        }

        state.loading = false;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTaskDraftToPrepare.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTaskDraftToPrepare.fulfilled, (state, action) => {
        if (Array.isArray(state.data)) {
          state.data.push(action.payload.task);
        } else {
          state.data = [action.payload.task];
        }

        state.loading = false;
      })
      .addCase(updateTaskDraftToPrepare.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateStatusFromToDoToDraft.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStatusFromToDoToDraft.fulfilled, (state, action) => {
        if (Array.isArray(state.data)) {
          state.data.push(action.payload.task);
        } else {
          state.data = [action.payload.task];
        }

        state.loading = false;
      })
      .addCase(updateStatusFromToDoToDraft.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(refuseTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(refuseTask.fulfilled, (state, action) => {
        if (Array.isArray(state.data)) {
          state.data.push(action.payload.task);
        } else {
          state.data = [action.payload.task];
        }

        state.loading = false;
      })
      .addCase(refuseTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changeStatusDoneToClose.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeStatusDoneToClose.fulfilled, (state, action) => {
        if (Array.isArray(state.data)) {
          state.data.push(action.payload.task);
        } else {
          state.data = [action.payload.task];
        }

        state.loading = false;
      })
      .addCase(changeStatusDoneToClose.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changeStatusFromDoneToDoing.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeStatusFromDoneToDoing.fulfilled, (state, action) => {
        if (Array.isArray(state.data)) {
          state.data.push(action.payload.task);
        } else {
          state.data = [action.payload.task];
        }

        state.loading = false;
      })
      .addCase(changeStatusFromDoneToDoing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTaskDisagreeAndChangeToToDo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTaskDisagreeAndChangeToToDo.fulfilled, (state, action) => {
        if (Array.isArray(state.data)) {
          state.data.push(action.payload.task);
        } else {
          state.data = [action.payload.task];
        }

        state.loading = false;
      })
      .addCase(updateTaskDisagreeAndChangeToToDo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changeStatusToPendingAndCancel.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeStatusToPendingAndCancel.fulfilled, (state, action) => {
        if (Array.isArray(state.data)) {
          state.data.push(action.payload.task);
        } else {
          state.data = [action.payload.task];
        }

        state.loading = false;
      })
      .addCase(changeStatusToPendingAndCancel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changeStatusToDoing.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeStatusToDoing.fulfilled, (state, action) => {
        if (Array.isArray(state.data)) {
          state.data.push(action.payload.task);
        } else {
          state.data = [action.payload.task];
        }

        state.loading = false;
      })
      .addCase(changeStatusToDoing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.data)) {
          state.data.push(action.payload.task);
        } else {
          state.data = [action.payload.task];
        }
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
