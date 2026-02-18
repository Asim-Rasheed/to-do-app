import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000";

// --------------------- LOGIN ---------------------
export const loginUser = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (!res.ok) return rejectWithValue(data.message);

            localStorage.setItem("token", data.token);
            return data.token
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// --------------------- REGISTER ---------------------
export const registerUser = createAsyncThunk(
    "auth/register",
    async ({ name, email, password }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();
            if (!res.ok) return rejectWithValue(data.message);
            return data.user;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);


// --------------------- FETCH ME ---------------------
export const fetchMe = createAsyncThunk(
    "auth/fetchMe",
    async (_, { getState, rejectWithValue, dispatch }) => {
        try {
            const token = getState().auth.token;
            const res = await fetch(`${API_URL}/api/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (res.status === 401) {
                dispatch(logout()); 
                return rejectWithValue("Session expired. Please log in again.");
                setTimeout(() => {
                    rejectWithValue(null), 3000
                });
            }
            if (!res.ok) return rejectWithValue(data.message);
            return data.user;
        } catch (err) {

            return rejectWithValue(err.message);
        }
    }
);



// --------------------- SLICE ---------------------
const initialState = {
    token: localStorage.getItem("token"),
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            state.token = null;
            state.user = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // login
            .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // fetch me
            .addCase(fetchMe.pending, (state) => { state.loading = true; })
            .addCase(fetchMe.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
            .addCase(fetchMe.rejected, (state, action) => { state.loading = false; state.error = action.payload; localStorage.removeItem("token"); })

            // register
            .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;