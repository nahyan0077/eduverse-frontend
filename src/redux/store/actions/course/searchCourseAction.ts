import { config } from "@/common/configurations";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const searchCourseAction = createAsyncThunk (
    "course/searchCourse" , async (query: string, {rejectWithValue}) => {
        try {
            const response = await CLIENT_API.get(`/api/course/search?${query}`,config)

			if (response.data.success) {
				return response.data;
			} else {
				return rejectWithValue(response.data);
			}
        } catch (error) {
			console.log("Create course action Error: ", error);
			const e: AxiosError = error as AxiosError;
			return rejectWithValue(e.response?.data || e.message);
        }
    }
)