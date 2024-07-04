import { config } from "@/common/configurations";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const createOrUpdateResultAction = createAsyncThunk(
	"course/createOrUpdateResult",
	async (
		data: {
			userRef?: string;
			assessmentRef?: string;
			isPassed?: boolean;
			score?: number;
		},
		{ rejectWithValue }
	) => {
		try {
			const response = await CLIENT_API.post(
				`/api/course/exam/result`,
				data,
				config
			);

			if (response.data.success) {
				return response.data;
			} else {
				return rejectWithValue(response.data);
			}
		} catch (error) {
			console.log("Fetch enrollment action Error: ", error);
			const e: AxiosError = error as AxiosError;
			return rejectWithValue(e.response?.data || e.message);
		}
	}
);
