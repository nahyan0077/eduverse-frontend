import { createAsyncThunk } from "@reduxjs/toolkit";
import { CLIENT_API } from "@/utils/axios";
import { AxiosError } from "axios";
import { config } from "@/common/configurations";

export const getActiveCoursesAction = createAsyncThunk(
    "course/getActiveCourses",
    async (
        data: {
            page: number,
            limit: number
        }, {rejectWithValue}
    ) => {

        let query = "?";
        if (data?.page) {
            query += `page=${data.page}&`;
        }
        if (data?.limit) {
            query += `limit=${data.limit}`;
        }
        
        try {

            const response = await CLIENT_API.get(
                `/api/course/get-active-courses${query}`,
                config
            );

			if (response.data.success) {
				return response.data;
			} else {
				return rejectWithValue(response.data);
			}

        } catch (error) {
			console.log("Get active course action Error: ", error);
			const e: AxiosError = error as AxiosError;
			return rejectWithValue(e.response?.data || e.message);
        }
    }
)