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
    }) => {
       
        try {

            const response = await CLIENT_API.post(
                `/api/course/enrollment`,
                data,
                config
            );

            if (response.data.success) {
                return response.data;
            }

            throw new Error(response.data?.message);

        } catch (error) {
            const e: any = error as AxiosError;
            throw new Error(e.response?.data.error || e.response?.data.message || e.message);
        }
    }
)