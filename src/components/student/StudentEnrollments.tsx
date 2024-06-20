import { useAppDispatch } from "@/hooks/hooks";
import { RootState } from "@/redux/store";
import { getEnrollmentByUserIdAction } from "@/redux/store/actions/enrollment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";

export const StudentEnrollment: React.FC = () => {
    const { data } = useSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();
    const [enrollments, setEnrollments] = useState<any[]>([]);
    const [isEmpty, setIsEmpty] = useState(false);
	const navigate = useNavigate();

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
            const fetchedEnrollments = response.payload.data;
            setEnrollments(fetchedEnrollments);
            setIsEmpty(fetchedEnrollments.length === 0);
        }
    };

    return (
        <div className="max-h-screen flex justify-center items-center">
            {isEmpty ? (
                <div className="pt-20 mt-20 text-center">
                    <Player
                        autoplay
                        loop
                        src="https://lottie.host/2a21cfdf-5523-444f-a483-a4673cd63c49/bKl0W0Zndb.json"
                        style={{ height: "40%", width: "40%" }}
                    />
					<h2 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent" >No enrollments found</h2>
                </div>
            ) : (
                <div className="flex flex-wrap justify-center gap-10 p-10">
                    {enrollments.map((enrollment: any) => (
                        <div key={enrollment._id} className="card w-72 glass" onClick={()=>navigate('/student/single-enrollment',{state: enrollment.courseId})} >
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
                                <div className="text-right">
                                    <progress className="progress progress-primary w-56 mt-4" value="70" max="100"></progress>
                                    <button className="btn btn-sm btn-neutral">1/4</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};