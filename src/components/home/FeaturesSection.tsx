import pic1 from "@/assets/home/5 SCENE.png";
import pic2 from "@/assets/home/3 SCENE.png";
import pic3 from "@/assets/home/6 SCENE.png";
import pic4 from "@/assets/home/9 SCENE.png";
import pic5 from "@/assets/home/1 SCENE.png";
import { useTheme } from "../ui/theme-provider";

const FeaturesSection: React.FC = () => {
	const { theme } = useTheme()
	return (
		<>
			<div className=" p-5">
				<div className=" flex flex-col items-center justify-center h-full mx-auto mb-3 max-w-7xl">
					<h1 className="text-violet-700 font-bold text-4xl">
						<span className="text-blue-950">Our </span> Features
					</h1>
					<p className="text-gray-400 text-base mt-4">
						This is where you can add your feature description.
					</p>
				</div>

				<div className="flex mx-auto flex-col-reverse lg:flex-row max-w-7xl justify-center">
					<div className="flex items-center w-full lg:w-1/2">
						<img src={pic1} alt="" />
					</div>
					<div className="flex flex-col items-center w-full lg:w-1/2 md:mt-32">
						<h1 className="text-violet-700 text-2xl font-bold">
							<span className="text-blue-950 text-2xl font-bold">Tools</span>{" "}
							For Teachers And Learners
						</h1>
						<p className="text-gray-500 font-thin w-96 p-4">
							Class has a dynamic set of teaching tools built to be deployed and
							used during class. Teachers can handout assignments in real-time
							for students to complete and submit.
						</p>
					</div>
				</div>
				<div className="flex mx-auto flex-col-reverse lg:flex-row max-w-7xl justify-center">
					<div className="flex flex-col items-center w:full lg:w-1/2 md:mt-32">
						<h1 className="text-violet-700 text-2xl font-bold">
							Assessments,
							<span className="text-blue-950 text-2xl font-bold">
								{" "}
								Quizzes,
							</span>{" "}
							Tests
						</h1>
						<p className="text-gray-500 font-thin w-96 p-4">
							Easily launch live assignments, quizzes, and tests. Student
							results are automatically entered in the online gradebook.
						</p>
					</div>
					<div className="flex items-center w:full lg:w-1/2">
						<img src={pic2} alt="" />
					</div>
				</div>
				<div className="flex mx-auto flex-col-reverse lg:flex-row max-w-7xl justify-center">
					<div className="flex items-center w:full lg:w-1/2">
						<img src={pic3} alt="" />
					</div>
					<div className="flex flex-col items-center w:full lg:w-1/2 md:mt-32">
						<h1 className="text-violet-700 text-2xl font-bold">
							Class Management{" "}
						</h1>
						<span className="text-blue-950 text-2xl font-bold">
							{" "}
							Tools for Educators
						</span>
						<p className="text-gray-500 font-thin w-96 p-4">
							Class provides tools to help run and manage the class such as
							Class Roster, Attendance, and more. With the Gradebook, teachers
							can review and grade tests and quizzes in real-time.
						</p>
					</div>
				</div>
				<div className="flex mx-auto flex-col-reverse lg:flex-row max-w-7xl justify-center">
					<div className="flex flex-col items-center w:full lg:w-1/2 md:mt-32">
						<h1 className="text-violet-700 text-2xl font-bold">
							{" "}
							<span className="text-blue-950 text-2xl font-bold">
								{" "}
								One-on-One{" "}
							</span>
							Discussions{" "}
						</h1>
						<p className="text-gray-500 font-thin w-96 p-4">
							Class provides tools to help run and manage the class such as
							Class Roster, Attendance, and more. With the Gradebook, teachers
							can review and grade tests and quizzes in real-time.
						</p>
					</div>
					<div className="flex items-center w:full lg:w-1/2">
						<img src={pic4} alt="" />
					</div>
				</div>

				<div className={`flex flex-col max-w-7xl mx-auto lg:flex-row justify-center items-center ${theme == 'light' ? 'bg-gray-100' : 'bg-gray-900' }   rounded-xl p-5`}>
					<div className="w:full lg:w-1/2">
						<img className="flex flex-col" src={pic5} alt="" />
					</div>
					<div className="w:full lg:w-1/2">
						<h1 className=" text-2xl font-bold text-violet-700 text-center">
							Join{" "}
							<span className="text-blue-950 text-2xl font-bold">
								{" "}
								World's largest{" "}
							</span>{" "}
							learning platform today
						</h1>
						<p className="mt-5 text-center">
							Start learning by registering for free
						</p>
						<p className="mt-5 text-gray-400 text-center">
							Join the largest learning platform today for a world of knowledge.
							Explore diverse courses, expert instructors, and interactive
							learning. Elevate your skills, career, and interests with us.
							Unlock endless learning possibilities now!
						</p>
						<div className="flex flex-col items-center">
							<button className="bg-gradient-to-r from-violet-400 to-pink-500 rounded-full text-sm p-3 text-white mt-8 hover:from-violet-500 hover:to-pink-400 shadow-[5px_5px_0px_0px_rgba(109,40,217)]">
								Sign Up for Free
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default FeaturesSection;
