import { config } from "@/common/configurations";
import { handleError } from "@/common/errorHandler";
import { Category } from "@/types/ICategory";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const editCategoryAction = createAsyncThunk (
    "admin/editCategory",async (data: Category, {rejectWithValue}) => {
        try {
            const response = await CLIENT_API.put('/api/course/category',data,config)

            if (response.data.success) {
                return response.data
            }else{
                return rejectWithValue(response.data)
            }

        } catch (error: any) {  
            return handleError(error, rejectWithValue)
            
        }
    }
)