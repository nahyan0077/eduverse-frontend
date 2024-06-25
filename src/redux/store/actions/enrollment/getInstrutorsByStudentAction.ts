import { config } from "@/common/configurations";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getInstructorsByStudentAction = createAsyncThunk(
	"course/getInstructorsByStudent",
	async (studentId: string, { rejectWithValue }) => {
		try {
			const response = await CLIENT_API.get(
				`/api/course/enrollment/instructor/${studentId}`,
				config
			);
			if (response.data.success) {
				return response.data;
			} else {
				return rejectWithValue(response.data);
			}
		} catch (error) {
			console.log(
				"get instructors by students action Error: ",
				error
			);
			const e: AxiosError = error as AxiosError;
			return rejectWithValue(e.response?.data || e.message);
		}
	}
);
