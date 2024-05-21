import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const findUsernameAction = createAsyncThunk(
	"user/findUserName",
	async (username: string, { rejectWithValue }) => {
		try {
			const response = await CLIENT_API.get(
				`/api/auth/available-username/${username}`,
				{
					withCredentials: true,
				}
			);

			if (response.data.success) {
				return response.data;
			} else {
				return rejectWithValue(response.data);
			}
		} catch (error: any) {
			const e: any = error as AxiosError;
			throw new Error(
				e.response?.data.error || e.response?.data.message || e.message
			);
		}
	}
);
