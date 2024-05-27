import { useAppDispatch } from "@/hooks/hooks";
import { getAllStudentsAction } from "@/redux/store/actions/user";
import { useEffect, useState } from "react";
import LoadingPopUp from "../common/skeleton/LoadingPopUp";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';


interface Instructor {
    id: number;
    username: string;
    profession: string;
    isVerified: boolean;
    isBlocked: boolean;
}

export const AdminStudents: React.FC = () => {
    const dispatch = useAppDispatch();
    const [Students, setStudents] = useState<Instructor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const resultAction = await dispatch(getAllStudentsAction({ page: 1, limit: 10 }));
                console.log(resultAction,"aciton result get instr");

                if (getAllStudentsAction.fulfilled.match(resultAction)) {
                    setStudents(resultAction.payload.data);
                } else {
                    setError('Failed to fetch Students');
                }
            } catch (err) {
                setError('An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, [dispatch]);

    if (loading) {
        return <LoadingPopUp isLoading={loading} />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="overflow-x-auto max-w-full mx-auto p-8">
            <table className="table table-lg">
                <thead className="text-lg uppercase text-center" >
                    <tr>
                        <th>Si.No</th>
                        <th>Name</th>
                        <th>profession</th>
                        <th>verified</th>
                        <th>status</th>
                    </tr>
                </thead>
                <tbody className="text-center" >
                    {Students.map((instructor, index) => (
                        <tr key={instructor.id} className="hover:bg-gray-800">
                            <th>{index + 1}</th>
                            <td>{instructor.username}</td>
                            <td>{instructor.profession}</td>
                            <td>{instructor.isVerified ? <DoneIcon /> : <CloseIcon/> }</td>
                            <td>{instructor.isBlocked ? <button className="btn btn-sm btn-outline btn-primary">Unblock</button> : 
                            <button className="btn btn-sm  btn-outline btn-error">Block</button> }</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
