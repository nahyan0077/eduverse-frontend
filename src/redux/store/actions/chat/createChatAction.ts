import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const createChatAction = createAsyncThunk(
	"chat/createChat",
	async (
		data: {
			participants: string[];
			type?: string;
			status?: string;
		},
		{ rejectWithValue }
	) => {
		try {
			const response = await CLIENT_API.post("/api/chat", data, {
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
			});

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
