// import { useAppDispatch } from "@/hooks/hooks";
// import { getAllStudentsAction } from "@/redux/store/actions/user";
// import { useEffect, useState } from "react";
// import LoadingPopUp from "../common/skeleton/LoadingPopUp";
// import DoneIcon from '@mui/icons-material/Done';
// import CloseIcon from '@mui/icons-material/Close';

// interface Student {
//     _id: string;
//     username: string;
//     profession: string;
//     isVerified: boolean;
//     isBlocked: boolean;
// }

// export const AdminStudents: React.FC = () => {
//     const dispatch = useAppDispatch();
//     const [students, setStudents] = useState<Student[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
//     const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

//     useEffect(() => {
//         const fetchStudents = async () => {
//             try {
//                 const resultAction = await dispatch(getAllStudentsAction({ page: 1, limit: 10 }));
//                 console.log(resultAction,"action result get instr");

//                 if (getAllStudentsAction.fulfilled.match(resultAction)) {
//                     setStudents(resultAction.payload.data);
//                 } else {
//                     setError('Failed to fetch students');
//                 }
//             } catch (err) {
//                 setError('An error occurred');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchStudents();
//     }, [dispatch]);

//     const handleBlock = (studentId: number) => {
//         setSelectedStudentId(studentId);
//         setShowConfirmationModal(true);
//     };

//     const handleConfirmBlock = () => {
//         if (selectedStudentId !== null) {
//             // Dispatch blockStudentAction with the selectedStudentId
//             // dispatch(blockStudentAction(selectedStudentId));
//             // Close the modal
//             setShowConfirmationModal(false);
//         }
//     };

//     const handleCancelBlock = () => {
//         // Clear the selected student id and close the modal
//         setSelectedStudentId(null);
//         setShowConfirmationModal(false);
//     };

//     if (loading) {
//         return <LoadingPopUp isLoading={loading} />;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <div className="overflow-x-auto max-w-full mx-auto p-8">
//             <table className="table table-lg">
//                 <thead className="text-lg uppercase text-center" >
//                     <tr>
//                         <th>Si.No</th>
//                         <th>Name</th>
//                         <th>Profession</th>
//                         <th>Verified</th>
//                         <th>Status</th>
//                     </tr>
//                 </thead>
//                 <tbody className="text-center" >
//                     {students.map((student, index) => (
//                         <tr key={student.id} className="hover:bg-gray-800">
//                             <th>{index + 1}</th>
//                             <td>{student.username}</td>
//                             <td>{student.profession}</td>
//                             <td>{student.isVerified ? <DoneIcon /> : <CloseIcon/> }</td>
//                             <td>
//                                 {student.isBlocked ? 
//                                     <button className="btn btn-sm btn-outline btn-primary" onClick={() => handleBlock(student._id)}>Unblock</button> : 
//                                     <button className="btn btn-sm btn-outline btn-error" onClick={() => handleBlock(student._id)}>Block</button>
//                                 }
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {/* Confirmation Modal */}
//             {showConfirmationModal && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                     <div className="bg-gray-900 p-8 rounded-lg shadow-lg">
//                         <p>Are you sure you want to block this student?</p>
//                         <div className="flex justify-end mt-4">
//                             <button className="btn btn-sm btn-outline btn-primary mr-2" onClick={handleConfirmBlock}>Yes</button>
//                             <button className="btn btn-sm btn-outline btn-error" onClick={handleCancelBlock}>No</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AdminStudents;
