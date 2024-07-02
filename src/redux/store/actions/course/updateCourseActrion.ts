import { config } from "@/common/configurations";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const updateCourseAction = createAsyncThunk(
    "course/updateCourse",
    async ({data, incrementStudentsEnrolled}: {data: any, incrementStudentsEnrolled: boolean},{rejectWithValue}) => {
       
        try {

            const response = await CLIENT_API.put(
                `/api/course?incrementStudentsEnrolled=${incrementStudentsEnrolled}`,
                data,
                config
            );

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