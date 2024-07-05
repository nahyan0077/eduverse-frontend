import { StudentChat } from "@/components/student/StudentChat";
import { StudentChatSubscription } from "@/components/student/StudentChatSubscription";
import StudentDashboard from "@/components/student/StudentDashboard";
import { StudentEnrollments } from "@/components/student/StudentEnrollments";
import { StudentExamsList } from "@/components/student/StudentExamsList";
import {StudentProfile} from "@/components/student/StudentProfile";
import { CoursePreview } from "@/components/student/enrollments/CoursePreview";
import { SingleEnrollmentPage } from "@/components/student/enrollments/SingleEnrollmentPage";
import { StudentExam } from "@/components/student/enrollments/StudentExam";
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
				<Route path="/enrollments" element={<StudentEnrollments />} />
				<Route path="/single-enrollment" element={<SingleEnrollmentPage />} />
				<Route path="/course-preview" element={<CoursePreview />} />
				<Route path="/chat" element={<StudentChat />} />
				<Route path="/exam" element={<StudentExam />} />
				<Route path="/subscription" element={<StudentChatSubscription />} />
				<Route path="/exams-list" element={<StudentExamsList />} />
			</Route>
		</Routes>
	);
};
