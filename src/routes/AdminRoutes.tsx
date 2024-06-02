import { Route, Routes } from "react-router-dom";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminDashboard from "@/components/admin/AdminDashBoard";
import AdminInstructors from "@/components/admin/AdminInstructors";
import AdminStudents from "@/components/admin/AdminStudents";
import { AdminRequests } from "@/components/admin/AdminRequest";

export const AdminRoutes = () => {
	return (

			<Routes>
				<Route path="/" element={<AdminLayout />}>
					<Route index element={<AdminDashboard />} />
					<Route path="instructors" element={<AdminInstructors />} />
					<Route path="students" element={<AdminStudents />} />
					<Route path="requests" element={<AdminRequests />} />
				</Route>
			</Routes>

	);
};
