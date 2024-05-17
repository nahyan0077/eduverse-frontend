
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaRegCopyright } from 'react-icons/fa';
import { TbBulb } from "react-icons/tb";
import { useTheme } from '../ui/theme-provider';



const Footer: React.FC = () => {
	const { theme } = useTheme()
	return (
		<footer className={`border-gray-200 p-4 ${theme == 'light' ? 'bg-gray-100' : 'bg-gray-900' } max-w-7xl mx-auto rounded-xl`}>
			{/* <div className="border border-gray-200 mb-4"></div> */}
			<div className="flex flex-wrap mx-auto max-w-7xl pl-12">
				<div className="w-full lg:w-1/5 mb-8 lg:mb-0 ">
					<div className="flex text-purple-700">
						<span className="font-extrabold text-xl">EDU</span>
						<TbBulb className="font-extrabold text-xl mt-1" />
						<span className="font-extrabold text-xl">VERSE</span>
					</div>
					<div>
						<ul className="flex space-x-3 mt-2 text-purple-700 text-xl">
							<li>
								<FaFacebook />{" "}
							</li>
							<li>
								<FaInstagram />{" "}
							</li>
							<li>
								<FaTwitter />{" "}
							</li>
							<li>
								<FaLinkedin />{" "}
							</li>
						</ul>
					</div>
					<div className="flex text-sm mt-5 text-gray-400 items-center">
						<h3 className="pr-2">
							<FaRegCopyright />
						</h3>
						<span className={`mb-1 ${theme == 'light' ? 'text-gray-500' : 'text-gray-400'} font-normal `} >2024 eduverse.in</span>
					</div>
					<div className="text-sm mt-5 text-gray-400 items-center">
						<h3 className={`mb-1 ${theme == 'light' ? 'text-gray-500' : 'text-gray-400'} font-normal `} >Eduverse is a registered</h3>
						<h3 className={`mb-1 ${theme == 'light' ? 'text-gray-500' : 'text-gray-400'} font-normal `} >trademark of eduverse.co</h3>
					</div>
				</div>
				<div className="w-full lg:w-1/5 mb-8 lg:mb-0">
					<ul className=" mt-2 text-gray-400 text-sm">
						<li className={`text-2xl font-normal mb-2 ${theme == 'light' ? 'text-black' : 'text-gray-300'} `}>Courses </li>
						<li className={`mb-1 ${theme == 'light' ? 'text-gray-500' : 'text-gray-400'} font-normal `}>Classroom courses </li>
						<li className={`mb-1 ${theme == 'light' ? 'text-gray-500' : 'text-gray-400'} font-normal `}>Virtual classroom courses </li>
						<li className={`mb-1 ${theme == 'light' ? 'text-gray-500' : 'text-gray-400'} font-normal `}>E-learning courses </li>
						<li className={`mb-1 ${theme == 'light' ? 'text-gray-500' : 'text-gray-400'} font-normal `}>Video Courses </li>
					</ul>
				</div>
				<div className="w-full lg:w-1/5 mb-8 lg:mb-0 ">
					<ul className=" mt-2 text-gray-400 text-sm">
						<li className={`text-2xl font-normal mb-2 ${theme == 'light' ? 'text-black' : 'text-gray-300'} `}>Community </li>
						<li className={`mb-1 ${theme == 'light' ? 'text-gray-500' : 'text-gray-400'} font-normal `}>Learners </li>
						<li className={`mb-1 ${theme == 'light' ? 'text-gray-500' : 'text-gray-400'} font-normal `}>Partners </li>
						<li className={`mb-1 ${theme == 'light' ? 'text-gray-500' : 'text-gray-400'} font-normal `}>Developers </li>
						<li className={`mb-1 ${theme == 'light' ? 'text-gray-500' : 'text-gray-400'} font-normal `}>Transaction </li>
						<li className={`mb-1 ${theme == 'light' ? 'text-gray-500' : 'text-gray-400'} font-normal `}>Blog </li>
						<li className={`mb-1 ${theme == 'light' ? 'text-gray-500' : 'text-gray-400'} font-normal `}>Teaching center </li>
					</ul>
				</div>
				<div className="w-full lg:w-1/5 mb-8 lg:mb-0 hidden md:block">
					<ul className=" mt-2 text-gray-400 text-sm">
						<li className={`text-2xl font-normal mb-2 ${theme == 'light' ? 'text-black' : 'text-gray-300'} `}>
							Quick Link{" "}
						</li>
						<li className={`mb-1 ${theme == 'light' ? 'text-gray-500' : 'text-gray-400'} font-normal `}>Home </li>
						<li className={`mb-1 ${theme == 'light' ? 'text-gray-500' : 'text-gray-400'} font-normal `}>Professional Education </li>
						<li className={`mb-1 ${theme == 'light' ? 'text-gray-500' : 'text-gray-400'} font-normal `}>Courses </li>
						<li className={`mb-1 ${theme == 'light' ? 'text-gray-500' : 'text-gray-400'} font-normal `}>Admission</li>
						<li className={`mb-1 ${theme == 'light' ? 'text-gray-500' : 'text-gray-400'} font-normal `}>Testimonial</li>
						<li className={`mb-1 ${theme == 'light' ? 'text-gray-500' : 'text-gray-400'} font-normal `}>Programs</li>
					</ul>
				</div>
				<div className="w-full lg:w-1/5 mb-8 lg:mb-0 hidden md:block">
					<ul className=" mt-2 text-gray-400 text-sm">
						<li className={`text-2xl font-normal mb-2 ${theme == 'light' ? 'text-black' : 'text-gray-300'} `}>More </li>
						<li className={`mb-1 ${theme == 'light' ? 'text-gray-500' : 'text-gray-400'} font-normal `}>Press </li>
						<li className={`mb-1 ${theme == 'light' ? 'text-gray-500' : 'text-gray-400'} font-normal `}>Investors </li>
						<li className={`mb-1 ${theme == 'light' ? 'text-gray-500' : 'text-gray-400'} font-normal `}>Terms </li>
						<li className={`mb-1 ${theme == 'light' ? 'text-gray-500' : 'text-gray-400'} font-normal `}>Privacy </li>
						<li className={`mb-1 ${theme == 'light' ? 'text-gray-500' : 'text-gray-400'} font-normal `}>Help </li>
						<li className={`mb-1 ${theme == 'light' ? 'text-gray-500' : 'text-gray-400'} font-normal `}>Contact </li>
					</ul>
				</div>
			</div>
			<div className={`max-w-7xl mx-auto flex items-center justify-between text-sm text-gray-400 ${theme == 'light' ? 'bg-gray-200' : 'bg-gray-800' } p-4 rounded mt-2 mb-4`}>
				<h2>privacy policy | terms & conditions</h2>
				<h2>All copyright (c) 2024 reserved</h2>
			</div>
            </footer>
	);
};
export default Footer;
