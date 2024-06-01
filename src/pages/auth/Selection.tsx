import {  Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Header from "@/components/common/users/Header";
import { Player } from "@lottiefiles/react-lottie-player";


const SelectionPage: React.FC = () => {
	const navigate = useNavigate();
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Header />
			<div className="min-h-screen">
				<div className="flex flex-col lg:flex-row justify-center items-center mt-20 max-w-7xl mx-auto">
					<LazyMotion features={domAnimation}>
						<m.div
							className="w-full lg:w-1/2 flex flex-col justify-center items-center mb-8 lg:mb-10 lg:mr-4"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							<Player
								autoplay
								loop
								src="https://lottie.host/0500eabd-5ca1-4e1c-87cc-7dd1bc18508f/4k0EdCWHws.json"
								style={{ height: "300px", width: "300px" }}
							/>
							<button
								onClick={() =>
									navigate("/signup", { state: { role: "student" } })
								}
								className="btn bg-violet-700 rounded-3xl text-white hover:bg-white hover:text-violet-700 shadow-[5px_5px_0px_0px_#805AD5] mt-4"
							>
								Enroll as Student
							</button>
							<p className="p-10 text-gray-500 text-center">
								"Join as a student to unlock a world of learning opportunities.
								Access a diverse range of courses, engage with interactive
								content, collaborate with peers, and track your progress as you
								embark on your educational journey."
							</p>
						</m.div>
						<m.div
							className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:mt-0 lg:ml-4"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							<Player
								autoplay
								loop
								src="https://lottie.host/91f128ec-1412-42ba-9e7a-f89a1a7460bd/ko4KPY1zvv.json"
								style={{ height: "300px", width: "300px" }}
							/>
							<button
								onClick={() =>
									navigate("/signup", { state: { role: "instructor" } })
								}
								className="btn bg-white rounded-3xl text-violet-700 hover:bg-violet-500 hover:text-white shadow-[5px_5px_0px_0px_rgba(109,40,217)]"
							>
								Enroll as Instructor
							</button>
							<p className="p-10 text-gray-500 text-center">
								"Become a part of our vibrant teaching community by enrolling as
								a teacher. Share your expertise, create engaging courses,
								interact with students, and make a meaningful impact on
								learners' lives. Empower the next generation of learners with
								your knowledge and passion."
							</p>
						</m.div>
					</LazyMotion>
				</div>
			</div>
		</Suspense>
	);
};

export default SelectionPage;
