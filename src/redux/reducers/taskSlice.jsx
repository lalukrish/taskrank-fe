import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  console.log("Fetching tasks...", token);

  const response = await axios.get(
    `${import.meta.env.VITE_API_POINT}/task/get-all-task`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("response.data", response.data);
  return response.data;
});

export const addTask = createAsyncThunk("tasks/addTask", async (taskData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_POINT}/task/create-task`,
    { ...taskData, rank: 1 },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
});

export const editTask = createAsyncThunk("tasks/editTask", async (taskData) => {
  const response = await axios.put(
    `${import.meta.env.VITE_API_POINT}/task/udpate-task/${taskData.id}`,
    taskData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
});

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId) => {
    await axios.delete(
      `${import.meta.env.VITE_API_POINT}/task/delete-task/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return taskId;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks.push(action.payload); // Add new task to state
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(editTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(editTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export default taskSlice.reducer;
