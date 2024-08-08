import { config } from "@/common/configurations";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getUserData = createAsyncThunk(
    "user/getUserData", async (_ , {rejectWithValue} ) => {

        try {
            const response = await CLIENT_API.get('/api/auth/getUser',config)
            
            console.log(response,"get users");
            

            if (response.data.success) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
            
        } catch (error: any) {
			const e: AxiosError = error as AxiosError;
			return rejectWithValue(e.response?.data || e.message);
        }
    }
)