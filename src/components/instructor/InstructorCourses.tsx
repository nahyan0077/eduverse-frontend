import { useNavigate } from "react-router-dom";

export const InstructorCourses : React.FC = () => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/instructor/add-course')
    };
    return(
        <>
        <div className="max-w-7xl mx-auto py-20">
			<div className="flex justify-between p-6 mb-5">
				<h2 className="text-4xl font-bold">Courses</h2>
				<button className="btn btn-outline btn-warning" onClick={handleClick}>
					Add Course
				</button>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				<div className="card card-compact w-96 bg-base-100 shadow-xl">
					<figure>
						<img
							src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
							alt="Shoes"
						/>
					</figure>
					<div className="card-body">
						<h2 className="card-title">Nodejs</h2>
						<p> This course have contents to make zero to hero in node js </p>
					</div>
				</div>
				
			</div>
		</div>
        </>
    )
}