import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../vite-env';

const getUserFromLocalStorage = (): IUser | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const getTokenFromLocalStorage = (): string | null => {
  const token = localStorage.getItem('token');
  return token ? token : null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getUserFromLocalStorage(),
    token: getTokenFromLocalStorage(),
  },
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload as IUser;
      if (state.user) {
        localStorage.setItem('user', JSON.stringify(state.user));
      } else {
        localStorage.removeItem('user');
      }
    },

    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload as string;
      if (state.token) {
        localStorage.setItem('token', state.token);
      } else {
        localStorage.removeItem('token');
      }
    },

    resetState: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { setUser, setToken, resetState } = authSlice.actions;
export default authSlice.reducer;
