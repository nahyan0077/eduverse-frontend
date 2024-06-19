import StudentDashboard from "@/components/student/StudentDashboard";
import { StudentEnrollment } from "@/components/student/StudentEnrollments";
import {StudentProfile} from "@/components/student/StudentProfile";
import { Unauthorized } from "@/pages/common/Unauthorized";
import StudentLayout from "@/pages/student/StudentLayout";
import { Route, Routes } from "react-router-dom";

export const StudentRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<StudentLayout />}>
				<Route index element={<StudentDashboard />} />
				<Route path="*" element={<Unauthorized />} />
				<Route path="/profile" element={<StudentProfile />} />
				<Route path="/enrollments" element={<StudentEnrollment />} />
			</Route>
		</Routes>
	);
};
