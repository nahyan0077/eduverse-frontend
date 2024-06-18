import { config } from "@/common/configurations";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const createPaymentSessionAction = createAsyncThunk(
	"course/createPaymentSession",
	async (
		data: {
			courseName: string;
			courseThumbnail: string;
			courseId: string;
			amount: number | string;
			userId: string;
		},
		{ rejectWithValue }
	) => {
		try {
			const response = await CLIENT_API.post(
				"/api/payment/session",
				data,
				config
			);
			if (response.data.success) {
				return response.data;
			} else {
				return rejectWithValue(response.data);
			}
		} catch (error: any) {
			console.log("Create payment session action Error: ", error);
			const e: AxiosError = error as AxiosError;
			return rejectWithValue(e.response?.data || e.message);
		}
	}
);
