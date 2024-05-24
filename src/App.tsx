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
import {  useAppSelector } from "./hooks/hooks";
import { RootState } from "./redux/store";
import { useEffect } from "react";
import VerificationPage from "./pages/Instructor/VerificationPage";

function App() {

	const userData = useAppSelector((state: RootState) => state.user );

	useEffect(() => {
	  console.log("User Data:", userData);
	}, [userData]);
	

	

	return (
		<>
			<Router>
				<Routes>
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
				</Routes>
			</Router>
		</>
	);
}

export default App;
