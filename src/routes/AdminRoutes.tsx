import { Route, Routes } from "react-router-dom";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminDashboard from "@/components/admin/AdminDashBoard";
import AdminStudents from "@/components/admin/AdminStudents";
import { AdminCategory } from "@/components/admin/AdminCategory";
import  UserDetailPage  from "@/components/admin/AdminUserData";
import { AdminCourses } from "@/components/admin/AdminCourses";
import { AdminSingleCourse } from "@/components/admin/course/AdminSingleCourse";
import { Unauthorized } from "@/pages/common/Unauthorized";
import { AdminInstructors } from "@/components/admin/AdminInstructors";

export const AdminRoutes = () => {

	return (

			<Routes>
				<Route path="/" element={<AdminLayout />}>
					<Route index element={<AdminDashboard />} />
					<Route path="/instructors" element={<AdminInstructors />} />
					<Route path="/students" element={<AdminStudents />} />
					<Route path="/categories" element={<AdminCategory />} />
					<Route path="/user-data" element={< UserDetailPage  />} />
					<Route path="/courses" element={< AdminCourses  />} />
					<Route path="/single-course" element={< AdminSingleCourse  />} />
					<Route path="*" element={<Unauthorized />} />
				</Route>
			</Routes>

	);
};
