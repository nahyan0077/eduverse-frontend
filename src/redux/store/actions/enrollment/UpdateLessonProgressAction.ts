import { config } from "@/common/configurations";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const UpdateLessonProgressAction = createAsyncThunk (
    "course/updateLessonProgress", async (data: {
        enrollmentId: string;
        lessonId: string;
        totalLessons: number;
    },{rejectWithValue}) => {
        try {

            console.log(data,"text backend data");
            

            const response = await CLIENT_API.post(`/api/course/enrollment/update`,data,config)

			if (response.data.success) {
				return response.data;
			} else {
				return rejectWithValue(response.data);
			}

        } catch (error) {
			console.log("Fetch enrollment action Error: ", error);
			const e: AxiosError = error as AxiosError;
			return rejectWithValue(e.response?.data || e.message); 
        }
    }
)