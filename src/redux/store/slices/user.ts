import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signupAction } from '../actions/auth/signupAction';
import { verifyOtpAction } from '../actions/auth/verifyOtpAction';
import { getUserData } from '../actions/auth';
import {  SignupFormData } from '@/types/IForms';  // Import User and SignupFormData types

export interface UserState {
  loading: boolean;
  data: SignupFormData | null;
  error: string | null;
  temp: SignupFormData | null;
}

const initialState: UserState = {
  loading: false,
  data: null,
  error: null,
  temp: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    tempSignUpData: (state: UserState, action: PayloadAction<SignupFormData>) => {
      state.temp = action.payload;
    },
    storeUserData: (state: UserState, action: PayloadAction<SignupFormData>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // signup user
      .addCase(signupAction.pending, (state: UserState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupAction.fulfilled, (state: UserState, action: PayloadAction<SignupFormData>) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(signupAction.rejected, (state: UserState, action) => {
        state.loading = false;
        state.error = action.error.message || 'signup failed';
        state.data = null;
      })

      // verify OTP
      .addCase(verifyOtpAction.pending, (state: UserState) => {
        state.loading = true;
      })
      .addCase(verifyOtpAction.fulfilled, (state: UserState, action: PayloadAction<{ data: SignupFormData }>) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = null;
      })
      .addCase(verifyOtpAction.rejected, (state: UserState, action) => {
        state.loading = false;
        state.error = action.error.message || 'Verification failed';
        state.data = null;
      })

      // get user data
      .addCase(getUserData.pending, (state: UserState) => {
        state.loading = true;
      })
      .addCase(getUserData.fulfilled, (state: UserState, action: PayloadAction<{ data: SignupFormData }>) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = null;
      })
      .addCase(getUserData.rejected, (state: UserState, action) => {
        state.loading = false;
        state.error = action.error.message || 'Fetching user data failed';
        state.data = null;
      });
  },
});

export const { storeUserData, tempSignUpData } = userSlice.actions;

export const userReducer = userSlice.reducer;
