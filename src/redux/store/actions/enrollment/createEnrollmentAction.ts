import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { config } from "@/common/configurations";
import { CLIENT_API } from "@/utils/axios";

export const createEnrollmentAction = createAsyncThunk(
    "course/createEnrollment",
    async (data: {
        userId: string;
        courseId: string;
        enrolledAt: number;
    },{rejectWithValue}) => {
       
        try {

            const response = await CLIENT_API.post(
                `/api/course/enrollment/`,
                data,
                config
            );
			if (response.data.success) {
				return response.data;
			} else {
				return rejectWithValue(response.data);
			}

        } catch (error) {
			console.log("Create enrollment action Error: ", error);
			const e: AxiosError = error as AxiosError;
			return rejectWithValue(e.response?.data || e.message);
        }
    }
)