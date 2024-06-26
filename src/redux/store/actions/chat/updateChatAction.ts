import { config } from "@/common/configurations";
import { ChatEntity } from "@/types/IChat";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const updateChatAction = createAsyncThunk (
    "chat/updateChat", async (data: ChatEntity,{rejectWithValue}) => {
        try {
            const response = await CLIENT_API.patch('/api/chat',data,config)

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