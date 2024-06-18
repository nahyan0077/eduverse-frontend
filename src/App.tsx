import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { RootState } from "./redux/store";
import { useEffect } from "react";
import { getUserData } from "./redux/store/actions/auth";

//auth pages
import Home from "./pages/user/Home";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import SelectionPage from "./pages/auth/Selection";
import OtpPage from "./pages/auth/OtpPage";
import { ForgotPassword } from "./pages/auth/ForgotPasswordPage";
import { ConfirmEmail } from "./pages/auth/ConfirmEmail";

// forms
import StudentRegisterForm from "./pages/student/StudentRegisterForm";
import StudentRegisterForm2 from "./pages/student/StudentRegisterForm2";
import TeacherRegisterForm from "./pages/Instructor/TeacherRegisterForm";
import TeacherRegisterForm2 from "./pages/Instructor/TeacherRegisterForm2";

//routes import
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


function App() {
	const { data } = useAppSelector((state: RootState) => state.user);
	const dispatch = useAppDispatch();



	useEffect(() => {
		if (!data) {
			dispatch(getUserData());
		}
		console.log(data, "user data app.tsx");
	}, [dispatch, data]);

	const userRole = data?.role; 
	console.log(userRole, "user role");

	return (
		<Router>
			<Routes>


				<Route
					path="/"
					element={
						<RoleBasedRedirect
							roles={{
								admin: "/admin",
								student: "/student ",
								instructor: "/instructor",
							}}
						/>
					}
				/>

				<Route
					path="/admin/*"
					element={
						<ProtectedRoute
							allowedRoles={["admin"]}
							element={<AdminRoutes />}
						/>
					}
				/>


				<Route
					path="/student/*"
					element={
						<ProtectedRoute
							allowedRoles={["student"]}
							element={<StudentRoutes />}
						/>
					}
				/>


				<Route
					path="/instructor/*"
					element={
						<ProtectedRoute
							allowedRoles={["instructor"]}
							element={<InstructorRoutes />}
						/>
					}
				/>


				{/* public routes */}

				<Route path="/courses" element={<PublicRoute element={<Course />} allowedRoles={['student']} />} />
				<Route path="/single-course" element={<PublicRoute element={<SingleCourse />} allowedRoles={['student']} />} />

				<Route path="/home" element={<PublicRoute element={<Home />} allowedRoles={['student']} />} />
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


				<Route path="/payment-success" element={<PublicRoute element={<PaymentSuccess />} allowedRoles={[]} />} />
				<Route path="/payment-failed" element={<PublicRoute element={<PaymentFailed />} allowedRoles={[]} />} />

				        {/* Catch-all route */}
						<Route path="*" element={<Unauthorized />} />
			</Routes>
		</Router>
	);
}

export default App;
