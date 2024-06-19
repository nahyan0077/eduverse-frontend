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
            const response: any = await dispatch(getEnrollmentByUserIdAction(data._id));
            setEnrollments(response.payload.data);
        }
    };

    return (
        <div className="max-w-full mx-auto p-28 flex gap-20">
            {enrollments.map((enrollment: any) => (
                <div key={enrollment._id} className="card w-72 glass">
                    <figure>
                        <img
                            src={enrollment.courseId.thumbnail}
                            alt={enrollment.courseId.title}
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title text-sm">{enrollment.courseId.title}</h2>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary btn-sm">Learn now!</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
