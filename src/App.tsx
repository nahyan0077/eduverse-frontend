import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { RootState } from "./redux/store";
import { useEffect } from "react";
import { getUserData } from "./redux/store/actions/auth";
import Home from "./pages/user/Home";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import SelectionPage from "./pages/auth/Selection";
import StudentRegisterForm from "./pages/student/StudentRegisterForm";
import StudentRegisterForm2 from "./pages/student/StudentRegisterForm2";
import TeacherRegisterForm from "./pages/Instructor/TeacherRegisterForm";
import TeacherRegisterForm2 from "./pages/Instructor/TeacherRegisterForm2";
import OtpPage from "./pages/auth/OtpPage";
import VerificationPage from "./pages/Instructor/VerificationPage";
import AdminHome from "./pages/admin/AdminHome";
import { ForgotPassword } from "./pages/auth/ForgotPasswordPage";
import { ConfirmEmail } from "./pages/auth/ConfirmEmail";
import InstructorHome from "./pages/Instructor/InstructorHome";

function App() {
	const { data } = useAppSelector((state: RootState) => state.user);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!data) {
			dispatch(getUserData());
		}
		console.log(data, "user data app.tsx");
	}, [dispatch, data]);

	const userRole = data?.role; // Assuming user role is stored in data.role
	console.log(userRole,"user role");
	

	return (
		<Router>
			<Routes>
				{/* Authentication pages */}
				{!data && (
					<>
						<Route path="/" element={<Home />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="/login" element={<Login />} />
						<Route path="/selection" element={<SelectionPage />} />
						<Route path="/student-form" element={<StudentRegisterForm />} />
						<Route path="/student-form2" element={<StudentRegisterForm2 />} />
						<Route path="/teacher-form" element={<TeacherRegisterForm />} />
						<Route path="/teacher-form2" element={<TeacherRegisterForm2 />} />
						<Route path="/otp" element={<OtpPage />} />
						<Route path="/forgot-password" element={<ForgotPassword />} />
						<Route path="/confirm-email" element={<ConfirmEmail />} />
						<Route path="/verification-page" element={<VerificationPage />} />
						<Route path="/instructor" element={<InstructorHome/>} />
					</>
				)}
				{/* Render based on user role */}
				{userRole === "student" && (
					<>
						<Route path="/" element={<Home />} />
						<Route path="/verification-page" element={<VerificationPage />} />


					</>
				)}
				{userRole === "instructor" && (
					<>
						<Route path="/" element={<Home />} />
						<Route path="/verification-page" element={<VerificationPage />} />
						<Route path="/instructor" element={<InstructorHome/>} />
					</>
				)}
				{userRole === "admin" && (
					<>
						<Route path="/admin" element={<AdminHome />} />
		
					</>
				)}
			</Routes>
		</Router>
	);
}

export default App;
