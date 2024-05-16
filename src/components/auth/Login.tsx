import { TbBulb } from "react-icons/tb";
import login from "../../assets/auth/login1.png";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";

const Login: React.FC = () => {
	const navigate = useNavigate();
	return (
		<>
			<div className="bg-white min-h-screen">
				<div className="flex text-purple-700 p-5 ml-10">
					<span className="font-extrabold text-3xl">EDU</span>
					<TbBulb className="font-extrabold text-3xl mt-1" />
					<span className="font-extrabold text-3xl">VERSE</span>
				</div>

				<div className="flex flex-col lg:flex-row max-w-7xl mx-auto items-center">
					<div className="w-full lg:w-1/2">
						<img src={login} alt="" className="w-full" />
					</div>
					<div className="w-full lg:w-1/2 p-5">
						<h1 className="text-violet-700 text-3xl font-bold p-4">Login</h1>

						<div className="flex flex-col gap-3  m-2 ">
							<input
								className="w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline bg-gray-100"
								type="text"
								placeholder="email"
							/>
							<input
								className="w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline bg-gray-100"
								type="text"
								placeholder="password"
							/>
							<button
								onClick={() => navigate("/selection")}
								className="bg-violet-700 text-white font-bold p-2 text-xs rounded-xl m-5"
							>
								Login
							</button>
							<p className="text-violet-700 text-center font-bold">
								Forgot Password?
							</p>
							<div className="flex justify-center mt-2">
								<button className="btn bg-white hover:bg-violet-700 text-violet-700 hover:text-white rounded-full border-violet-700 text-xs">
									<GoogleIcon className="text-center  rounded-full " />
									Sign in with google
								</button>
							</div>
						</div>
						<div></div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Login;
