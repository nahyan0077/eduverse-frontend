import { config } from "@/common/configurations";
import { LoginFormData } from "@/types/IForms";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";


export const loginAction = createAsyncThunk(
	"user/login",
	async (data: LoginFormData, { rejectWithValue }) => {
		try {
			const response = await CLIENT_API.post("/api/auth/login", data, config);

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
