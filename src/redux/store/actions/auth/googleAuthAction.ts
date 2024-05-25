import { config } from "@/common/configurations";
import { IGoogleAuth } from "@/types/IGoogeAuth";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const googleAuthAction = createAsyncThunk (
    "user/googl-auth",async(credentials: IGoogleAuth, {rejectWithValue})=>{
        try {
            console.log("cred reached act",credentials);
            
            const response = await CLIENT_API.post('/api/auth/google-auth',credentials,config)

            if (response.data.success) {
				return response.data;
			} else {
				return rejectWithValue(response.data);
			}

        } catch (error: any) {
            console.log("google auth error",error);
        }
    }
)