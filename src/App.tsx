import "./App.css";
import Login from "./pages/auth/Login";
import "./index.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/user/Home";
import SelectionPage from "./pages/auth/Selection";

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/login" element={<Login />} />
					<Route path="/selection" element={<SelectionPage />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
