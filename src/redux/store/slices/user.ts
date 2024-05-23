import {createSlice} from '@reduxjs/toolkit'
import { signupAction } from '../actions/auth/signupAction'
import { verifyOtpAction } from '../actions/auth/verifyOtpAction'

export interface userState {
    loading: boolean,
    data: any,
    error: any,
    temp: any
}

const initialState = {
    loading: false,
    data: null,
    error: null,
    temp: null
}

const userSlice = createSlice ({
    name: "user",
    initialState,
    reducers: {
        tempSignUpData : (state: userState, action) => {
            state.data = action.payload
        },
        storeUserData : (state: userState, action) => {
            state.data = action.payload
        }
    },
    extraReducers: ( builder ) => {
        builder

        //signup user
        .addCase(signupAction.pending, (state: userState) => {
            state.loading = true
            state.error = null
        })
        .addCase(signupAction.fulfilled, (state: userState, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        })
        .addCase(signupAction.rejected, (state: userState, action) => {
            state.loading = false
            state.error = action.error.message || "signup failed"
            state.data = null
        })


        //verify OTP
        .addCase(verifyOtpAction.pending, (state: userState) => {
            state.loading = true;
        })
        .addCase(verifyOtpAction.fulfilled, (state: userState, action) => {
            state.loading = false;
            state.data = action.payload?.data;
            state.error = null;
        })
        .addCase(verifyOtpAction.rejected, (state: userState, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.data = null;
        })
    }
})

export const { storeUserData, tempSignUpData } = userSlice.actions

export const userReducer = userSlice.reducer