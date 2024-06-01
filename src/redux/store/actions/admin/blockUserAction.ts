import { config } from "@/common/configurations";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const blockUserAction = createAsyncThunk(
    "admin/blockUser", async(data: {id: string, isBlocked: boolean}, {rejectWithValue}) => {
        try {
            const response = await CLIENT_API.patch('/api/user/admin-block-unblock', data, config)

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
)