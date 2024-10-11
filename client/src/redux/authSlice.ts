import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../vite-env';

interface AuthState {
  user: IUser | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload as IUser;
    },
    resetState: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, resetState } = authSlice.actions;
export default authSlice.reducer;
