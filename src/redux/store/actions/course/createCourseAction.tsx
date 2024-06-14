import { config } from "@/common/configurations";
import { CourseEntity } from "@/types/ICourse";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const createCourseAction = createAsyncThunk (
    "course/createCourse", async (data: CourseEntity,{rejectWithValue} ) => {
        try {
            const response = await CLIENT_API.post('/api/course/',data,config)

            if (response.data.success) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }

        } catch (error: any) {
            console.log("Create course action Error: ", error);
            const e: AxiosError = error as AxiosError;
            return rejectWithValue(e.response?.data || e.message);
        }
    }
)