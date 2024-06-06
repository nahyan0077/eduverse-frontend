import { config } from "@/common/configurations";
import { handleError } from "@/common/errorHandler";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addCategoryAction = createAsyncThunk(
    "course/addCategory", async(data: {categoryName: string, status: string}, {rejectWithValue}) => {
        try {

			console.log(data,"the cat data");
			
            const response = await CLIENT_API.post('/api/course/add-category', data, config)

			console.log(response,"in action");
			
            if (response.data.success) {
				return response.data;
			} else {
				console.log("error cat add");
				
				return rejectWithValue(response.data);
			}

        } catch (error: any) {
			console.log("error cat add");
			
            return handleError(error,rejectWithValue)
        }
    }
)