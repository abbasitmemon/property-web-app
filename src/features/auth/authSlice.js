import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, logoutApi } from '../../services/authService';

const initialToken = localStorage.getItem('token');
const initialUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const data = await loginApi(credentials); // returns { token, user }
    return data;
  } catch (e) {
    return rejectWithValue(e.response?.data || { message: 'Login failed' });
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await logoutApi();
    return true;
  } catch (e) {
    return rejectWithValue(e.response?.data || { message: 'Logout failed' });
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: initialToken || null, user: initialUser, status: 'idle', error: null },
  reducers: {
    setProfile(state, action) {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (s) => { s.status = 'loading'; s.error = null; })
      .addCase(login.fulfilled, (s, a) => {
        s.status = 'succeeded';
        s.token = a.payload.token;
        s.user = a.payload.user;
        localStorage.setItem('token', a.payload.token);
        localStorage.setItem('user', JSON.stringify(a.payload.user));
      })
      .addCase(login.rejected, (s, a) => { s.status = 'failed'; s.error = a.payload?.message || 'Login failed'; })
      .addCase(logout.fulfilled, (s) => {
        s.token = null; s.user = null; s.status = 'idle';
        localStorage.removeItem('token'); localStorage.removeItem('user');
      });
  },
});

export const { setProfile } = authSlice.actions;
export default authSlice.reducer;
