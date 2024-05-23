import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const verifyOtpAction = createAsyncThunk(
	"user/verifyOtp",
	async (data: { otp: string }, {rejectWithValue}) => {
		try {
			const response = await CLIENT_API.post("/api/auth/verify-otp", data, {
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
			});
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
