import { useAppDispatch } from "@/hooks/hooks";
import { getAllInstructorsAction } from "@/redux/store/actions/user";
import { useEffect, useState } from "react";
import LoadingPopUp from "../common/skeleton/LoadingPopUp";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { format } from 'date-fns';


interface Instructor {
    id: number;
    userName: string;
    createdAt: string;
    isVerified: boolean;
    isBlocked: boolean;
}

export const AdminInstructors: React.FC = () => {
    const dispatch = useAppDispatch();
    const [instructors, setInstructors] = useState<Instructor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                const resultAction = await dispatch(getAllInstructorsAction({ page: 1, limit: 10 }));
                console.log(resultAction,"aciton result get instr");

                if (getAllInstructorsAction.fulfilled.match(resultAction)) {
                    setInstructors(resultAction.payload.data);
                } else {
                    setError('Failed to fetch instructors');
                }
            } catch (err) {
                setError('An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchInstructors();
    }, [dispatch]);

    if (loading) {
        return <LoadingPopUp isLoading={loading} />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="overflow-x-auto max-w-full mx-auto p-8">
            <h1 className="text-3xl font-bold ml-10 mb-10" >Instructors</h1>
            <table className="table table-lg">
                <thead className="text-lg uppercase text-center" >
                    <tr>
                        <th>Si.No</th>
                        <th>Name</th>
                        <th>Joined</th>
                        <th>verified</th>
                        <th>status</th>
                    </tr>
                </thead>
                <tbody className="text-center" >
                    {instructors.map((instructor, index) => (
                        <tr key={instructor.id} className="hover:bg-gray-800">
                            <th>{index + 1}</th>
                            <td>{instructor.userName}</td>
                            <td>{ format(new Date(instructor.createdAt), 'dd-MM-yyyy') }</td>
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
