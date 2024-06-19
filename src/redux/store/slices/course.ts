import { createSlice } from "@reduxjs/toolkit";
import { getActiveCoursesAction } from "../actions/course";



interface CourseState {
	loading: boolean;
	data: any[];
	error: string | null;
}

const initialState: CourseState = {
	loading: false,
	data: [],
	error: null
};

const courseSlice = createSlice({
	name: "course",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getActiveCoursesAction.pending, (state: CourseState) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getActiveCoursesAction.fulfilled, (state: CourseState) => {
				state.loading = false;
				state.error = null;
			});
	},
});

export const courseReducer = courseSlice.reducer;
