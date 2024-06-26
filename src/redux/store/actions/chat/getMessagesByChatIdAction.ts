import { createAsyncThunk } from "@reduxjs/toolkit";
import { CLIENT_API } from "@/utils/axios";
import { AxiosError } from "axios";

export const getMessagesByChatIdAction = createAsyncThunk(
    "chat/getMessagesByChatId",
    async (
        chatId: string, {rejectWithValue}
    ) => {
        try {

            const response = await CLIENT_API.get(
                `/api/chat/message/${chatId}`,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
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
)