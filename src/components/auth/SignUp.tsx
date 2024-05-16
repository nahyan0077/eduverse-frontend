import { TbBulb } from "react-icons/tb";
import login from '../../assets/auth/login.png'
import GoogleButton from 'react-google-button'

const SignUp: React.FC = () => {
	return (
		<>
            <div className="bg-white min-h-screen" >
				<div className="flex text-purple-700 p-5 ml-10">
					<span className="font-extrabold text-3xl">EDU</span>
					<TbBulb className="font-extrabold text-3xl mt-1" />
					<span className="font-extrabold text-3xl">VERSE</span>
				</div>
	
			<div className="flex max-w-7xl mx-auto items-center">
				<div className="w-1/2">
                    <img src={login} alt="" />
                </div>
				<div className="w-1/2 p-5">
            
                    <h1 className="text-violet-700 text-3xl font-bold p-4" >Sign Up</h1>
               
                    <div className="flex flex-col gap-3  m-2 " >
                        <input className="w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline bg-gray-100" type="text" placeholder="username" />
                        <input className="w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline bg-gray-100" type="text" placeholder="email" />
                        <input className="w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline bg-gray-100" type="text" placeholder="password" />
                        <input className="w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline bg-gray-100" type="text" placeholder="confirm-password" />
                        <button className="bg-violet-700 text-white font-bold p-2 text-xs rounded-xl m-5" > Sign Up </button>
                        <p className="text-violet-700 text-center font-bold" >Forgot Password?</p>
                        <div className="border border-gray-200" ></div>
                        <div className="flex justify-center mt-2" >
                            <GoogleButton className="text-center" type="light" />
                        </div>
                        <p>Already have an account ? <span className="text-violet-700 text-center font-bold">Login</span></p>
                    </div>
                    <div>
                    </div>
                </div>
			</div>
            </div>
		</>
	);
};
export default SignUp;
