import { config } from "@/common/configurations";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const forgotPasswordMailAction = createAsyncThunk(
	"user/forgotPasswordMail",
	async ( email: string , { rejectWithValue }) => {
        try {
			const response = await CLIENT_API.post(
				"/api/auth/forgot-password-mail",
				{ email },
				config
			);


			if (response.data.success) {
				return response.data;
			} else {
				return rejectWithValue(response.data);
			}
		} catch (error: any) {
			const e: AxiosError = error as AxiosError;
			return rejectWithValue(e.response?.data || e.message);
		}
	}
);
