import { config } from "@/common/configurations";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getAllCourseByIdAction = createAsyncThunk (
    "course/getCourseById", async (id: string, {rejectWithValue}) => {
        try {
            const response = await CLIENT_API.get(`/api/course/enrolled/${id}`,config)

            if (response.data.success) {
				return response.data;
			} else {
				return rejectWithValue(response.data);
			}

        } catch (error: any) {
            console.log("Get active course action Error: ", error);
			const e: AxiosError = error as AxiosError;
			return rejectWithValue(e.response?.data || e.message);
        }
    }
)