import { config } from "@/common/configurations";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getAllReviewsAction = createAsyncThunk (
    "course/getAllReviews", async (data: { page: number | string, limit: number | string, courseId: string },{rejectWithValue} ) => {
        try {

            let query = "?"

            if(data?.courseId){
                query += `courseId=${data.courseId}&`
            }

            if(data?.page){
                query += `page=${data.page}&`
            }

            if(data?.limit){
                query += `page=${data.limit}`
            }

            const response = await CLIENT_API.get(`/api/course/review${query}`,config)

            if (response.data.success) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }

        } catch (error: any) {
            console.log("Get all reviews action Error: ", error);
            const e: AxiosError = error as AxiosError;
            return rejectWithValue(e.response?.data || e.message);
        }
    }
)