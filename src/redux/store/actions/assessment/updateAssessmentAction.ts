import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { config } from "@/common/configurations";
import { CLIENT_API } from "@/utils/axios";

export const updateAssessmentAction = createAsyncThunk(
    "course/updateAssessment",
    async (data: any, {rejectWithValue}) => {
       
        try {

            console.log(data,"das action");
            

            const response = await CLIENT_API.put(
                "/api/course/assessment",
                data,
                config
            );

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