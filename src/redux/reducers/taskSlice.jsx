import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");
const userId = localStorage.getItem("USER_ID");

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  console.log("Fetching tasks...", token);

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_POINT}/task/get-all-task/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response.data", response.data.tasks);
    return response.data.tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error(
      error.response ? error.response.data.message : "Error fetching tasks"
    );
  }
});

export const addTask = createAsyncThunk("tasks/addTask", async (taskData) => {
  try {
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
  } catch (error) {
    console.error("Error adding task:", error);
    throw new Error(
      error.response ? error.response.data.message : "Error adding task"
    );
  }
});

export const editTask = createAsyncThunk("tasks/editTask", async (taskData) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_POINT}/task/update-task/${taskData.id}`,
      taskData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error editing task:", error);
    throw new Error(
      error.response ? error.response.data.message : "Error editing task"
    );
  }
});

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_POINT}/task/delete-task/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return taskId;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw new Error(
        error.response ? error.response.data.message : "Error deleting task"
      );
    }
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
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks.push(action.payload); // Add new task to state
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
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
        state.error = action.error.message;
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
        state.error = action.error.message;
      });
  },
});

export default taskSlice.reducer;
