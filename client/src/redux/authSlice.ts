import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../vite-env';

const getUserFromLocalStorage = (): IUser | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getUserFromLocalStorage(),
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

    resetState: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

export const { setUser, resetState } = authSlice.actions;
export default authSlice.reducer;
