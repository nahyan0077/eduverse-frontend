import { CLIENT_API } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Define a separate config for PDF downloads
const pdfConfig: any = {
	responseType: "blob",
	headers: {
		Accept: "application/pdf",
	},
	withCredentials: true,
};

export const generateCertificate = createAsyncThunk(
	"course/generateCertificate",
	async (data: { courseId?: string; userId?: string }, { rejectWithValue }) => {
		try {
			const response = await CLIENT_API.get(
				`/api/course/generate-certificate/?courseId=${data.courseId}&userId=${data.userId}`,
				pdfConfig
			);

			const file = new Blob([response.data], { type: "application/pdf" });

			const fileURL = URL.createObjectURL(file);
			const link = document.createElement("a");
			link.href = fileURL;
			link.download = `certificate_${data.courseId}.pdf`;
			link.click();
			URL.revokeObjectURL(fileURL);

			return { success: true, message: "Certificate downloaded successfully" };
		} catch (error: any) {
			console.error("Error generating certificate:", error);
			return rejectWithValue({
				success: false,
				message:
					error.response?.data?.message || "Failed to generate certificate",
				error: error.message,
			});
		}
	}
);
