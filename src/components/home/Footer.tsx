import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaRegCopyright } from 'react-icons/fa';
import { TbBulb } from "react-icons/tb";


const Footer: React.FC = () => {
	return (
		<footer className="bg-white border border-gray-200 p-4">
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
						<span>2024 eduverse.in</span>
					</div>
					<div className="text-sm mt-5 text-gray-400 items-center">
						<h3>Eduverse is a registered</h3>
						<h3>trademark of eduverse.co</h3>
					</div>
				</div>
				<div className="w-full lg:w-1/5 mb-8 lg:mb-0">
					<ul className=" mt-2 text-gray-400 text-sm">
						<li className="text-black text-2xl font-medium mb-2">Courses </li>
						<li className="mb-1">Classroom courses </li>
						<li className="mb-1">Virtual classroom courses </li>
						<li className="mb-1">E-learning courses </li>
						<li className="mb-1">Video Courses </li>
					</ul>
				</div>
				<div className="w-full lg:w-1/5 mb-8 lg:mb-0 ">
					<ul className=" mt-2 text-gray-400 text-sm">
						<li className="text-black text-2xl font-medium mb-2">Community </li>
						<li className="mb-1">Learners </li>
						<li className="mb-1">Partners </li>
						<li className="mb-1">Developers </li>
						<li className="mb-1">Transaction </li>
						<li className="mb-1">Blog </li>
						<li className="mb-1">Teaching center </li>
					</ul>
				</div>
				<div className="w-full lg:w-1/5 mb-8 lg:mb-0 hidden md:block">
					<ul className=" mt-2 text-gray-400 text-sm">
						<li className="text-black text-2xl font-medium mb-2">
							Quick Link{" "}
						</li>
						<li className="mb-1">Home </li>
						<li className="mb-1">Professional Education </li>
						<li className="mb-1">Courses </li>
						<li className="mb-1">Admission</li>
						<li className="mb-1">Testimonial</li>
						<li className="mb-1">Programs</li>
					</ul>
				</div>
				<div className="w-full lg:w-1/5 mb-8 lg:mb-0 hidden md:block">
					<ul className=" mt-2 text-gray-400 text-sm">
						<li className="text-black text-2xl font-medium mb-2">More </li>
						<li className="mb-1">Press </li>
						<li className="mb-1">Investors </li>
						<li className="mb-1">Terms </li>
						<li className="mb-1">Privacy </li>
						<li className="mb-1">Help </li>
						<li className="mb-1">Contact </li>
					</ul>
				</div>
			</div>
			<div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-gray-400 bg-purple-50 p-4 rounded mt-2 mb-4">
				<h2>privacy policy | terms & conditions</h2>
				<h2>All copyright (c) 2024 reserved</h2>
			</div>
            </footer>
	);
};
export default Footer;
