import "./App.css";
import "./index.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { RootState } from "./redux/store";
import { useEffect } from "react";
import { getUserData } from "./redux/store/actions/auth";
import { logoutAction } from "./redux/store/actions/auth/logoutAction"; // Make sure to import logoutAction

// Import your pages and components
import Home from "./pages/user/Home";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import SelectionPage from "./pages/auth/Selection";
import OtpPage from "./pages/auth/OtpPage";
import { ForgotPassword } from "./pages/auth/ForgotPasswordPage";
import { ConfirmEmail } from "./pages/auth/ConfirmEmail";
import StudentRegisterForm from "./pages/student/StudentRegisterForm";
import StudentRegisterForm2 from "./pages/student/StudentRegisterForm2";
import TeacherRegisterForm from "./pages/Instructor/TeacherRegisterForm";
import TeacherRegisterForm2 from "./pages/Instructor/TeacherRegisterForm2";

// Import your route components
import { RoleBasedRedirect } from "./routes/RoleBasedRedirect";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { AdminRoutes } from "./routes/AdminRoutes";
import { StudentRoutes } from "./routes/StudentRoutes";
import { InstructorRoutes } from "./routes/InstructorRoutes";
import PublicRoute from "./routes/PublicRoutes";
import { Course } from "./pages/user/Course";
import { Unauthorized } from "./pages/common/Unauthorized";
import { SingleCourse } from "./pages/user/SingleCourse";
import { PaymentSuccess } from "./pages/common/PaymentSuccess";
import { PaymentFailed } from "./pages/common/PaymentFailed";
import { SearchResult } from "./pages/common/SearchResult";
import { InstructorChat } from "./components/instructor/InstructorChat";
import { AllMentorsSection } from "./pages/user/AllMentorsSection";

function App() {
	const { data } = useAppSelector((state: RootState) => state.user);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!data) {
			dispatch(getUserData());
		} else if (data.isBlocked) {
			dispatch(logoutAction());
		}
	}, [dispatch, data]);

	// Log userRole to console
	const userRole = data?.role;
	console.log(userRole, "user role");

	return (
		<Router>
			<Routes>
				{/* Role-based redirection */}
				<Route
					path="/"
					element={
						<RoleBasedRedirect
							roles={{
								admin: "/admin",
								student: "/student",
								instructor: "/instructor",
							}}
						/>
					}
				/>

				{/* Admin routes */}
				<Route
					path="/admin/*"
					element={<ProtectedRoute allowedRoles={["admin"]} element={<AdminRoutes />} />}
				/>

				{/* Student routes */}
				<Route
					path="/student/*"
					element={<ProtectedRoute allowedRoles={["student"]} element={<StudentRoutes />} />}
				/>

				{/* Instructor routes */}
				<Route
					path="/instructor/*"
					element={<ProtectedRoute allowedRoles={["instructor"]} element={<InstructorRoutes />} />}
				/>

				{/* Public routes */}
				<Route path="/courses" element={<PublicRoute element={<Course />} allowedRoles={["student"]} />} />
				<Route path="/all-mentors" element={<PublicRoute element={<AllMentorsSection />} allowedRoles={["student"]} />} />
				<Route path="/single-course" element={<PublicRoute element={<SingleCourse />} allowedRoles={["student"]} />} />
				<Route path="/home" element={<PublicRoute element={<Home />} allowedRoles={["student"]} />} />
				<Route path="/unauthorized" element={<Unauthorized />} />
				<Route path="/signup" element={<PublicRoute element={<SignUp />} allowedRoles={[]} />} />
				<Route path="/login" element={<PublicRoute element={<Login />} allowedRoles={[]} />} />
				<Route path="/selection" element={<PublicRoute element={<SelectionPage />} allowedRoles={[]} />} />
				<Route path="/student-form" element={<PublicRoute element={<StudentRegisterForm />} allowedRoles={[]} />} />
				<Route path="/student-form2" element={<PublicRoute element={<StudentRegisterForm2 />} allowedRoles={[]} />} />
				<Route path="/teacher-form" element={<PublicRoute element={<TeacherRegisterForm />} allowedRoles={[]} />} />
				<Route path="/teacher-form2" element={<PublicRoute element={<TeacherRegisterForm2 />} allowedRoles={[]} />} />
				<Route path="/otp" element={<PublicRoute element={<OtpPage />} allowedRoles={[]} />} />
				<Route path="/forgot-password" element={<PublicRoute element={<ForgotPassword />} allowedRoles={[]} />} />
				<Route path="/confirm-email" element={<PublicRoute element={<ConfirmEmail />} allowedRoles={[]} />} />
				<Route path="/search" element={<PublicRoute element={<SearchResult />} allowedRoles={["student"]} />} />
				<Route path="/payment-success" element={<PublicRoute element={<PaymentSuccess />} allowedRoles={["student"]} />} />
				<Route path="/payment-failed" element={<PublicRoute element={<PaymentFailed />} allowedRoles={["student"]} />} />

				<Route path="/newchat" element={<InstructorChat />} />

				{/* Catch-all route */}
				<Route path="*" element={<Unauthorized />} />
			</Routes>
		</Router>
	);
}

export default App;
