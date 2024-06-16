import {  createSlice } from "@reduxjs/toolkit";
import {  getAllActiveCategories } from "../actions/category";

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
        .addCase(getAllActiveCategories.pending, (state: CategoryState) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(
            getAllActiveCategories.fulfilled,
            (state: CategoryState, action) => {
                console.log(action.payload.data,"check catgory in reducer");
                
                state.loading = false; 
                state.data = action.payload.data;
                state.error = null;
            }
        )

    }
})



export const categoryReducer = categorySlice.reducer