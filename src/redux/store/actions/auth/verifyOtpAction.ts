import { config } from "@/common/configurations";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const verifyOtpAction = createAsyncThunk(
	"user/verifyOtp",
	async (data: { otp: string, email: string }, {rejectWithValue}) => {
		try {
			const response = await CLIENT_API.post("/api/auth/verify-otp", data, config);
            if (response.data.success) {
				return response.data;
			} else {
				return rejectWithValue(response.data);
			}
		} catch (error: any) {
            console.log("OTP verification error",error);
		}
	}
);
