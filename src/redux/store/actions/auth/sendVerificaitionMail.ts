import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const sendVerificationMail = createAsyncThunk (
    "user/sendVerificationMail", async (email: string,{rejectWithValue}) => {
        try {

            console.log(email,"otp data");
            

            const response = await CLIENT_API.post("/api/notification/email-verification",{email: email},{withCredentials: true})

            if (response.data.success) {
				return response.data;
			} else {
				return rejectWithValue(response.data);
			}

        } catch (error: any) {
            console.log("send verification mail error",error);
            const e: AxiosError = error as AxiosError;
			return rejectWithValue(e.response?.data || e.message);
        }
    }
)