import { config } from "@/common/configurations";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const updateProfileAction = createAsyncThunk(
    "user/updateProfile",
    async (data: any, {rejectWithValue}) => {
        try {

            const response = await CLIENT_API.put(
                `/api/user/profile`,
                data,
                config
            );

            if (response.data.success) {
                return response.data;
            }

            throw new Error(response.data?.message);

        } catch (error) {
            console.log("Get students action Error: ", error);
            const e: AxiosError = error as AxiosError;
            return rejectWithValue(e.response?.data || e.message);
        }
    }
)