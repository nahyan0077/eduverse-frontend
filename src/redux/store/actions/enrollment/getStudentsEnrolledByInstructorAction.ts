import { config } from "@/common/configurations";
import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getStudentsEnrolledByInstructorAction = createAsyncThunk(
	"course/getStudentsEnrolledByInstructor",
	async (instructorId: string, { rejectWithValue }) => {
		try {
			const response = await CLIENT_API.get(
				`/api/course/enrollment/student/${instructorId}`,
				config
			);
			if (response.data.success) {
				return response.data;
			} else {
				return rejectWithValue(response.data);
			}
		} catch (error) {
			console.log(
				"get students enrolled under an instructor action Error: ",
				error
			);
			const e: AxiosError = error as AxiosError;
			return rejectWithValue(e.response?.data || e.message);
		}
	}
);
