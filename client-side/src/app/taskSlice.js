import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000";

// ================= FETCH TASKS =================
export const fetchTasks = createAsyncThunk(
  "tasks/acessTasks",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await fetch(`${API_URL}/api/accessTask`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message);

      return data.tasks;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ================= CREATE TASK =================
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async ({ title, description }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await fetch(`${API_URL}/api/createTask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message);

      return data.task;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

//==============taskupdatebyAdmin=====================

export const updateTaskStatus = createAsyncThunk(
  "tasks/updateTaskStatus",
  async (taskId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await fetch(`${API_URL}/api/updatetaskstatus/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message);
      return data.task;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


// ================= SLICE =================
const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder


      // FETCH
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      //update
      .addCase(updateTaskStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
  state.loading = false;
  const task = state.tasks.find(t => t._id.toString() === action.payload._id.toString());
  if (task) {
    task.completed = action.payload.completed;
  }
})
      .addCase(updateTaskStatus.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})
  },
});




export default taskSlice.reducer;
