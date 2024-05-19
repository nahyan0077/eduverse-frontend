import "./App.css";
import Login from "./pages/auth/Login";
import "./index.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/user/Home";
import SelectionPage from "./pages/auth/Selection";
import StudentRegisterForm from "./pages/student/StudentRegisterForm";
import StudentRegisterForm2 from "./pages/student/StudentRegisterForm2";
import TeacherRegisterForm from "./pages/student/TeacherRegisterForm";
import TeacherRegisterForm2 from "./pages/student/TeacherRegisterForm2";
import OtpPage from "./pages/auth/OtpPage";

function App() {
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
		
				</Routes>
			</Router>
		</>
	);
}

export default App;
