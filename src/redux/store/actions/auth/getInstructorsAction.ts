import { config } from "@/common/configurations";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getInstructorsAction = createAsyncThunk(
    'admin/get-instructors', async (_, {rejectWithValue}) => {

        try {
            
            const response = await CLIENT_API.get('/auth/get-instructors',config)
            if (response.data.success) {
                return response.data
            }else{
                return rejectWithValue(response.data)
            }
        } catch (error: any) {
            console.log("Get instructors action Error: ",error);
                       
        }

    }
)