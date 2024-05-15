import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { TbBulb } from "react-icons/tb";
import {useState} from 'react'

// import { IoMdClose } from "react-icons/io";

const Header: React.FC = () => {

	const [menuOpen, setMenuOpen] = useState(false)

	return (
		<>
			<nav className="bg-white p-5">
				<div className="flex items-center justify-around  md:justify-between max-w-7xl mx-auto">
					<div className="flex text-purple-700 ">
						<span className="font-extrabold text-3xl">EDU</span>
						<TbBulb className="font-extrabold text-3xl mt-1" />
						<span className="font-extrabold text-3xl">VERSE</span>
					</div>
					<div className="md:hidden text-purple-700 hover:text-purple-700" onClick={()=>setMenuOpen(!menuOpen)}>
						 <MenuRoundedIcon /> 
					</div>
					
					<div className="hidden md:block pl-10">
						<ul className="flex space-x-10">
							<li>
								<a href="#" className="text-purple-700 hover:text-white hover:bg-purple-500  rounded-2xl p-3">
									Home
								</a>
							</li>
							<li>
								<a href="#" className="text-purple-700 hover:text-white hover:bg-purple-500 rounded-2xl p-3">
									Categories
								</a>
							</li>
							<li>
								<a href="#" className="text-purple-700 hover:text-white hover:bg-purple-500 rounded-2xl p-3">
									Courses
								</a>
							</li>
							<li>
								<a href="#" className="text-purple-700 hover:text-white hover:bg-purple-500 rounded-2xl p-3">
									Contact
								</a>
							</li>
							<li>
								<a href="#" className="text-purple-700 hover:text-white hover:bg-purple-500 rounded-2xl p-3">
									About
								</a>
							</li>
						</ul>
					</div>
					<div className="hidden md:block">
						<button className=" text-white text-sm hover:bg-purple-500 bg-purple-700 p-3 rounded-3xl ml-20 shadow-[5px_5px_0px_0px_rgba(109,40,217)]">
							Get Started
						</button>
					</div>
				</div>
					{menuOpen &&
						<div className="md:hidden text-purple-700 pl-3 mt-1 text-center">
						<ul className="hover:bg-purple-200 border-b border-t border-gray-200" >
							<li className="m-1" >Home</li>
						</ul>
						<ul className="hover:bg-purple-200 border-b border-t border-gray-200" >
							<li className="m-1" >Categories</li>
						</ul>
						<ul className="hover:bg-purple-200 border-b border-t border-gray-200" >
							<li className="m-1" >Couses</li>
						</ul>
						<ul className="hover:bg-purple-200 border-b border-t border-gray-200" >
							<li className="m-1" >Contact us</li>
						</ul>
						<ul className="hover:bg-purple-200 border-b border-t border-gray-200" >
							<li className="m-1" >About us</li>
						</ul>
						{/* <ul className="hover:bg-purple-200 border-b border-t border-gray-200" onClick={()=>setMenuOpen(!menuOpen)} >
							<IoMdClose className="ml-40 m-1" />
						</ul> */}
					</div>
					}
			</nav>
					<div className="border-b border-gray-300" ></div>
		</>
	);
};

export default Header;
