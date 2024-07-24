import { config } from "@/common/configurations";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getAllInstructorsAction = createAsyncThunk(
    'admin/get-instructors',
    async (data: { page?: string | number | null; limit?: string | number | null }, { rejectWithValue }) => {
        try {
            let query = "?";
            if (data?.page) {
                query += `page=${data.page}&`;
            }
            if (data?.limit) {
                query += `limit=${data.limit}`;
            }

            const response = await CLIENT_API.get(`/api/user/get-all-instructors${query}`, config);
            if (response.data.success) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (error: any) {
            console.log("Get instructors action Error: ", error);
            const e: AxiosError = error as AxiosError;
            return rejectWithValue(e.response?.data || e.message);
        }
    }
);
