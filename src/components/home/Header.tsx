import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { TbBulb } from "react-icons/tb";
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "../ui/mode-toggle";

const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate()

    return (
        <>
            <nav className="p-5 relative">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex text-violet-700 cursor-pointer" onClick={()=>navigate('/')}>
                        <span className="font-extrabold text-3xl">EDU</span>
                        <TbBulb className="font-extrabold text-3xl mt-1" />
                        <span className="font-extrabold text-3xl">VERSE</span>
                    </div>

                    <div className="hidden md:block">
                        <ul className="flex space-x-10">
                            <li>
                                <a href="#" className="text-violet-700 hover:border border-violet-700 font-bold rounded-xl p-3">Home</a>
                            </li>
                            <li>
                                <a href="#" className="text-violet-700 hover:border border-violet-700 font-bold rounded-xl p-3">Categories</a>
                            </li>
                            <li>
                                <a href="#" className="text-violet-700 hover:border border-violet-700 font-bold rounded-xl p-3">Courses</a>
                            </li>
                            <li>
                                <a href="#" className="text-violet-700 hover:border border-violet-700 font-bold rounded-xl p-3">Contact</a>
                            </li>
                            <li>
                                <a href="#" className="text-violet-700 hover:border border-violet-700 font-bold rounded-xl p-3">About</a>
                            </li>
                        </ul>
                    </div>
                    <ModeToggle/>
                    <div className="hidden md:block  space-x-2">
                        <button className="border border-violet-700 text-violet-700 text-sm bg-white px-4 py-2 rounded-md ml-20">Login</button>
                        <button className="border border-violet-700 text-gray-50 text-sm bg-violet-700 px-4 py-2 rounded-md ml-20">Sign up</button>
                    </div>

                    <div className="md:hidden text-violet-700 hover:text-violet-700 cursor-pointer">
                        <MenuRoundedIcon onClick={() => setMenuOpen(!menuOpen)} />
                    </div>
                </div>

                <AnimatePresence>
                    {menuOpen && (
                        <>
                            <motion.div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm backdrop-brightness-50" 
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
                                transition={{ duration: 0.3 }} />

                            <motion.div className="absolute top-0 w-[50%] h-screen right-0 bg-white text-violet-700 border border-gray-200 rounded-md shadow-md"
                                initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} 
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}>
                                <div className="p-3 flex justify-end">
                                    <ClearIcon onClick={()=>setMenuOpen(false)} />
                                </div>
                                <ul className="p-3 text-left gap-6">
                                    <li className="py-1 px-4 hover:bg-purple-100 rounded-md font-semibold">Home</li>
                                    <li className="py-1 px-4 hover:bg-purple-100 rounded-md font-semibold">Categories</li>
                                    <li className="py-1 px-4 hover:bg-purple-100 rounded-md font-semibold">Courses</li>
                                    <li className="py-1 px-4 hover:bg-purple-100 rounded-md font-semibold">Contact us</li>
                                    <li className="py-1 px-4 hover:bg-purple-100 rounded-md font-semibold">About us</li>
                                    <li className="py-1 px-4 hover:bg-purple-100 rounded-md font-semibold">Login</li>
                                    <li className="py-1 px-4 hover:bg-purple-100 rounded-md font-semibold">Sign up</li>
                                </ul>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </nav>
            <div className="border-b border-gray-300"></div>
        </>
    );
};

export default Header;
