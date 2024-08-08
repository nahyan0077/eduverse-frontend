import { config } from "@/common/configurations";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const updatePasswordAction = createAsyncThunk(
	"user/updatePassword",
	async (data:{token: string, password: string}, { rejectWithValue }) => {
		try {
			const response = await CLIENT_API.post(
				"/api/auth/update-password",
				data,
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
