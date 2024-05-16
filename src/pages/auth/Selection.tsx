import { TbBulb } from "react-icons/tb";
import student from "../../assets/auth/student.png";
import teacher from "../../assets/auth/teacher1.png";
import Header from "../../components/home/Header";
import { useNavigate } from "react-router-dom";

const SelectionPage: React.FC = () => {
	const navigate = useNavigate()
	return (
		<>
			<Header />
			<div className="bg-white min-h-[88vh]">
				{/* <div className="flex text-purple-700 pt-5 ml-10">
					<span className="font-extrabold text-3xl">EDU</span>
					<TbBulb className="font-extrabold text-3xl mt-1" />
					<span className="font-extrabold text-3xl">VERSE</span>
				</div> */}
				<div className="flex flex-col lg:flex-row justify-center max-w-7xl mx-auto pt-20">
					<div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
						<img className="max-w-xs" src={student} alt="Student" />
						<button onClick={()=>navigate('/login')} className="btn bg-purple-700 rounded-3xl text-white hover:bg-white hover:text-purple-700 shadow-[5px_5px_0px_0px_#805AD5]">
							Enroll as Student
						</button>
						<p className="p-10 text-gray-500">
							"Join as a student to unlock a world of learning opportunities.
							Access a diverse range of courses, engage with interactive
							content, collaborate with peers, and track your progress as you
							embark on your educational journey."
						</p>
					</div>
					<div className="w-full lg:w-1/2 flex flex-col justify-center items-center mt-8 lg:mt-0 lg:ml-8">
						<img className="max-w-xs" src={teacher} alt="Teacher" />
						<button onClick={()=>navigate('/login')} className="btn bg-white rounded-3xl mt-7 text-purple-700 hover:bg-purple-500 hover:text-white shadow-[5px_5px_0px_0px_rgba(109,40,217)]">
							Enroll as Instructor
						</button>
						<p className="p-10 text-gray-500">
							"Become a part of our vibrant teaching community by enrolling as a
							teacher. Share your expertise, create engaging courses, interact
							with students, and make a meaningful impact on learners' lives.
							Empower the next generation of learners with your knowledge and
							passion."
						</p>
					</div>
				</div>
			</div>
		</>
	);
};
export default SelectionPage;
