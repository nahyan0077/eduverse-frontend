import { config } from "@/common/configurations";
import { ReviewEntity } from "@/types/IReview";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const createReviewAction = createAsyncThunk (
    "course/createReview", async (data: ReviewEntity,{rejectWithValue} ) => {
        try {
            const response = await CLIENT_API.post('/api/course/review',data,config)

            if (response.data.success) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }

        } catch (error: any) {
            console.log("Create review action Error: ", error);
            const e: AxiosError = error as AxiosError;
            return rejectWithValue(e.response?.data || e.message);
        }
    }
)