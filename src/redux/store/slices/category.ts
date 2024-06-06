import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { addCategoryAction } from "../actions/category";

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
    reducers: {},
    extraReducers: (builder) => {
        builder.
        addCase(addCategoryAction.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(addCategoryAction.fulfilled, (state, action : PayloadAction<Category>) => {
            state.loading = false
            state.data.push(action.payload)
            state.error = null
        })
        .addCase(addCategoryAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "something went wrong"
        })
    }
})



export const categoryReducer = categorySlice.reducer