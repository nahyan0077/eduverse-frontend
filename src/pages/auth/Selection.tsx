import { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Header from "@/components/home/Header";

// Importing images normally
import student from "@/assets/auth/students.png";
import teacher from "@/assets/auth/teachers.png";

const SelectionPage: React.FC = () => {
	const navigate = useNavigate();
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Header />
			<div className="min-h-screen">
				<div className="flex flex-col lg:flex-row justify-center max-w-7xl mx-auto pt-20">
					<LazyMotion features={domAnimation}>
						<m.div
							className="w-full lg:w-1/2 flex flex-col justify-center items-center"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							<img className="max-w-xs" src={student} alt="Student" loading="lazy" />
							<button
								onClick={() => navigate('/login', { state: { role: "student" } })}
								className="btn bg-violet-700 rounded-3xl text-white hover:bg-white hover:text-violet-700 shadow-[5px_5px_0px_0px_#805AD5] mt-4"
							>
								Enroll as Student
							</button>
							<p className="p-10 text-gray-500">
								"Join as a student to unlock a world of learning opportunities.
								Access a diverse range of courses, engage with interactive
								content, collaborate with peers, and track your progress as you
								embark on your educational journey."
							</p>
						</m.div>
						<m.div
							className="w-full lg:w-1/2 flex flex-col justify-center items-center mt-8 lg:mt-0 lg:ml-8"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							<img className="max-w-xs" src={teacher} alt="Teacher" loading="lazy" />
							<button
								onClick={() => navigate('/login', { state: { role: "instructor" } })}
								className="btn bg-white rounded-3xl mt-7 text-violet-700 hover:bg-violet-500 hover:text-white shadow-[5px_5px_0px_0px_rgba(109,40,217)]"
							>
								Enroll as Instructor
							</button>
							<p className="p-10 text-gray-500">
								"Become a part of our vibrant teaching community by enrolling as a
								teacher. Share your expertise, create engaging courses, interact
								with students, and make a meaningful impact on learners' lives.
								Empower the next generation of learners with your knowledge and
								passion."
							</p>
						</m.div>
					</LazyMotion>
				</div>
			</div>
		</Suspense>
	);
};

export default SelectionPage;
