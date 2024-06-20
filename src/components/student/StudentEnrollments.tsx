import { useAppDispatch } from "@/hooks/hooks";
import { RootState } from "@/redux/store";
import { getEnrollmentByUserIdAction } from "@/redux/store/actions/enrollment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const StudentEnrollment: React.FC = () => {
	const { data } = useSelector((state: RootState) => state.user);
	const dispatch = useAppDispatch();
	const [enrollments, setEnrollments] = useState<any[]>([]);

	useEffect(() => {
		if (data && data._id) {
			fetchEnrollments();
		}
	}, [data]);

	const fetchEnrollments = async () => {
		if (data && data._id) {
			const response: any = await dispatch(
				getEnrollmentByUserIdAction(data._id)
			);
			setEnrollments(response.payload.data);
		}
	};

	return (
		<div className="max-w-full mx-auto px-28 py-20 flex gap-20">
			<div className="flex flex-wrap gap-10">
				{enrollments.map((enrollment: any) => (
					<div key={enrollment._id} className="card w-72 glass">
						<figure>
							<img
								src={enrollment.courseId.thumbnail}
								alt={enrollment.courseId.title}
							/>
						</figure>
						<div className="card-body">
							<h2 className="card-title text-sm">
								{enrollment.courseId.title}
							</h2>
                            <div className="text-right"  >
							<progress className="progress progress-primary w-56 mt-4" value="70" max="100"></progress>
                            <button className="btn btn-sm btn-neutral" > 1/4</button>
                            </div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
