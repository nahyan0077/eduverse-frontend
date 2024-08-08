import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const findEmailAction = createAsyncThunk(
	"user/find-email",
	async (email: string, {rejectWithValue}) => {
		try {

			
			const response = await CLIENT_API.get(
				`/api/auth/available-email/${email}`,
				{ withCredentials: true }
			);

			
			if (response.data.success) {
				return response.data;
			}else{
				return rejectWithValue(response.data)
			}
		} catch (error: any) {
			const e: AxiosError = error as AxiosError;
			return rejectWithValue(e.response?.data || e.message);
		}
	}
);
