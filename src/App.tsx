import "./App.css";
import Login from "./pages/auth/Login";
import "./index.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/user/Home";
import SelectionPage from "./pages/auth/Selection";
import StudentRegisterForm from "./pages/student/StudentRegisterForm";
import StudentRegisterForm2 from "./pages/student/StudentRegisterForm2";
import TeacherRegisterForm from "./pages/Instructor/TeacherRegisterForm";
import TeacherRegisterForm2 from "./pages/Instructor/TeacherRegisterForm2";
import OtpPage from "./pages/auth/OtpPage";
import {  useAppDispatch, useAppSelector } from "./hooks/hooks";
import { RootState } from "./redux/store";
import { useEffect } from "react";
import VerificationPage from "./pages/Instructor/VerificationPage";
import AdminHome from "./pages/admin/AdminHome";
import { ForgotPassword } from "./pages/auth/ForgotPasswordPage";
import { getUserData } from "./redux/store/actions/auth";

function App() {

	const {data} = useAppSelector((state: RootState) => state.user );
	const dispatch = useAppDispatch()

	useEffect(() => {
		if(!data){
			dispatch(getUserData())
		}
	  console.log("User Data:", data);
	}, [dispatch,data]);

	// const userRole = 'student' || 'teacher' || 'admin'
	

	

	return (
		<>
			<Router>
				<Routes>



					{/* authentication pages */}

					<Route path="/" element={<Home />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/login" element={<Login />} />
					<Route path="/selection" element={<SelectionPage />} />
					<Route path='/student-form' element={ <StudentRegisterForm/> } />
					<Route path='/student-form2' element={ <StudentRegisterForm2/> } />
					<Route path='/teacher-form' element={ <TeacherRegisterForm/> } />
					<Route path='/teacher-form2' element={ <TeacherRegisterForm2/> } />
					<Route path='/otp' element={ <OtpPage/> } />



					<Route path='/verification-page' element={ <VerificationPage/> } />
					<Route path='/admin' element={ <AdminHome/> } />


					<Route path="/forgot-password" element={ <ForgotPassword/> } />
				</Routes>
			</Router>
		</>
	);
}


export default App;