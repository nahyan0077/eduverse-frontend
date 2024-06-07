import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { addCategoryAction, getAllCategories } from "../actions/category";

interface Category {
    _id: string,
    categoryName: string,
    state: string,
    createdAt?: string;
}

interface CategoryState {
    loading: boolean,
    data: Category[],
    error: string | null
}

const initialState : CategoryState = {
    loading: false,
    data: [],
    error: null
}


const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        storeCategoryData: (
            state: CategoryState,
            action
        )=>{
            state.data.push(action.payload.data);
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllCategories.pending, (state: CategoryState) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(
            getAllCategories.fulfilled,
            (state: CategoryState, action) => {
                state.loading = false; 
                state.data = action.payload.data;
                state.error = null;
            }
        )

    }
})



export const categoryReducer = categorySlice.reducer