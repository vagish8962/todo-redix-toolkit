import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { thunkFetcher } from '../utils/fetcher';
import { LoginApiResponse, LoginState } from '../types/login';
import { RootState } from './index';

export const loginUser = createAsyncThunk(
  'users/login',
  async ({ email, password }: { email: string; password: string }) => {
    const data = await thunkFetcher<LoginApiResponse>(
      'https://reqres.in/api/login',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    return {
      email,
      token: data.token,
    };
  }
);

const initialState = {
  username: '',
  email: '',
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
} as LoginState;

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(
        loginUser.fulfilled,
        (
          state,
          { payload }: PayloadAction<{ email: string; token: string }>
        ) => {
          localStorage.setItem('token', payload.token);
          state.email = payload.email;
          state.isFetching = false;
          state.isSuccess = true;
          return state;
        }
      )
      .addCase(loginUser.rejected, (state) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = 'Invalid emailid or passowrd';
        return state;
      }),
});

export const userSelector = (state: RootState) => state.login;
export const { clearState } = loginSlice.actions;

export default loginSlice.reducer;
