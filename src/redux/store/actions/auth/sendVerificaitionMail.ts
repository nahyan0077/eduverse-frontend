import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const sendVerificationMail = createAsyncThunk (
    "user/sendVerificationMail", async (_,{rejectWithValue}) => {
        try {
            const response = await CLIENT_API.get("/api/notification/email-verification",{withCredentials: true})

            if (response.data.success) {
				return response.data;
			} else {
				return rejectWithValue(response.data);
			}

        } catch (error: any) {
            console.log("send verification mail error",error);
            
        }
    }
)