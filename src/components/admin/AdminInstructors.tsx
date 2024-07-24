import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect, useState, SyntheticEvent } from "react";
import { useAppDispatch } from "@/hooks/hooks";
import { getAllInstructorsAction } from "@/redux/store/actions/user";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { updateProfileAction } from "@/redux/store/actions/user/updateProfileAction";
import DownloadIcon from "@mui/icons-material/Download";
import ConfirmModal from "../common/modal/ConfirmModal";
import { rejectInstructorAction, verifyInstructorAction } from "@/redux/store/actions/admin";
import { Toaster, toast } from "sonner";
import LoadingPopUp from "../common/skeleton/LoadingPopUp";

interface Instructor {
    _id: string;
    firstName: string;
    createdAt: string;
    isVerified: boolean;
    isBlocked: boolean;
    profile: {
        avatar: string;
    };
    cv: string;
    email: string;
    isRequested: boolean;
}

export const AdminInstructors: React.FC = () => {
    const [value, setValue] = useState("1");
    const dispatch = useAppDispatch();
    const [instructors, setInstructors] = useState<Instructor[]>([]);
    const [reqInstructors, setReqInstructors] = useState<Instructor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalAction, setModalAction] = useState<() => void>(() => {});
    const navigate = useNavigate();

    const handleChange = (event: SyntheticEvent, newValue: string) => {
		console.log(event,"this is just for fun");
		
        setValue(newValue);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 30;

    useEffect(() => {
        fetchInstructors();
    }, [currentPage]);

    const fetchInstructors = async () => {
        setLoading(true);
        try {
            const resultAction = await dispatch(getAllInstructorsAction({ page: currentPage, limit: usersPerPage }));
            if (getAllInstructorsAction.fulfilled.match(resultAction)) {
                const instructorsData = resultAction.payload.data;
                if (instructorsData.length > 0) {
                    const verifiedInstructors = instructorsData.filter((data: Instructor) => data.isVerified);
                    setInstructors(verifiedInstructors);
                    const requestedInstructors = instructorsData.filter((data: Instructor) => data.isRequested);
                    setReqInstructors(requestedInstructors);
                } else if (currentPage > 1) {
                    setCurrentPage((prevPage) => prevPage - 1);
                }
            } else {
                setError("Failed to fetch instructors");
            }
        } catch (err) {
            setError("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleBlockUnblock = async (id: string, isBlocked: boolean) => {
        setModalAction(() => async () => {
            const response = await dispatch(updateProfileAction({ _id: id, isBlocked: !isBlocked }));
            if (updateProfileAction.fulfilled.match(response)) {
                toast.success(`Instructor ${isBlocked ? "unblocked" : "blocked"} successfully!`);
                fetchInstructors();
            } else {
                toast.error(`Failed to ${isBlocked ? "unblock" : "block"} instructor`);
            }
            setModalVisible(false);
        });
        setModalVisible(true);
    };

    const downloadCV = (cvUrl: string) => {
        window.open(cvUrl, "_blank");
    };

    const handleVerify = (id: string, email: string) => {
        setModalAction(() => async () => {
            const response = await dispatch(verifyInstructorAction({ id, email }));
            if (verifyInstructorAction.fulfilled.match(response)) {
                setReqInstructors((prev) => prev.filter((instructor) => instructor._id !== id));
                setInstructors((prev) => prev.map((instructor) => (instructor._id === id ? { ...instructor, isVerified: true } : instructor)));
                fetchInstructors();
                toast.success("Instructor verified successfully!");
            } else {
                toast.error("Failed to verify instructor");
            }
            setModalVisible(false);
        });
        setModalVisible(true);
    };

    const handleReject = (id: string, email: string) => {
        setModalAction(() => async () => {
            const response = await dispatch(rejectInstructorAction({ id, email }));
            if (rejectInstructorAction.fulfilled.match(response)) {
                setReqInstructors((prev) => prev.filter((instructor) => instructor._id !== id));
                fetchInstructors();
                toast.success("Instructor rejected successfully!");
            } else {
                toast.error("Failed to reject instructor");
            }
            setModalVisible(false);
        });
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleDisplayUser = (id: string, isRequested: boolean) => {
        const user = (isRequested ? reqInstructors : instructors).filter((data) => data._id === id);
        navigate("/admin/user-data", { state: { user } });
    };

    if (loading) return <div><LoadingPopUp isLoading={loading} /></div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <Toaster richColors position="top-center" />
            {modalVisible && <ConfirmModal message="perform the action " onConfirm={modalAction} onCancel={handleCancel} />}
            <div className="max-w-full mx-auto py-10 px-10">
                <div className="flex justify-between p-6 mb-5">
                    <h2 className="text-4xl font-bold">Instructors</h2>
                </div>
                <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example" textColor="inherit">
                                <Tab label="Instructors" value="1" />
                                <Tab label="Requested" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-900 dark:text-gray-400">
                                        <tr className="text-center">
                                            <th scope="col" className="px-6 py-3">Si. No</th>
                                            <th scope="col" className="px-6 py-3">Thumbnail</th>
                                            <th scope="col" className="px-6 py-3">Instructor Name</th>
                                            <th scope="col" className="px-6 py-3">Joined</th>
                                            <th scope="col" className="px-6 py-3">Block / Unblock</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {instructors.map((instructor, index) => (
                                            <tr key={instructor._id} 
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
                                                onClick={() => handleDisplayUser(instructor._id, false)}
                                            >
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</th>
                                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <div className="flex justify-center">
                                                        <img className="object-cover w-10 h-10 p-1 rounded-full" src={instructor.profile.avatar} alt="User" />
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{instructor.firstName}</td>
                                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{format(new Date(instructor.createdAt), "dd-MM-yyyy")}</td>
                                                <td>
                                                    <button
                                                        className={`btn btn-sm btn-outline ${instructor.isBlocked ? 'btn-primary' : 'btn-error'}`}
                                                        onClick={(e) => { e.stopPropagation(); handleBlockUnblock(instructor._id, instructor.isBlocked); }}
                                                    >
                                                        {instructor.isBlocked ? 'Unblock' : 'Block'}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </TabPanel>
                        <TabPanel value="2">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-900 dark:text-gray-400">
                                        <tr className="text-center">
                                            <th scope="col" className="px-6 py-3">Si. No</th>
                                            <th scope="col" className="px-6 py-3">Thumbnail</th>
                                            <th scope="col" className="px-6 py-3">Instructor Name</th>
                                            <th scope="col" className="px-6 py-3">Joined</th>
                                            <th scope="col" className="px-6 py-3">CV</th>
                                            <th scope="col" className="px-6 py-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reqInstructors.map((instructor, index) => (
                                            <tr 
                                                key={instructor._id} 
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
                                                onClick={() => handleDisplayUser(instructor._id, true)}
                                            >
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</th>
                                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <div className="flex justify-center">
                                                        <img className="object-cover w-10 h-10 p-1 rounded-full" src={instructor.profile.avatar} alt="User" />
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{instructor.firstName}</td>
                                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{format(new Date(instructor.createdAt), "dd-MM-yyyy")}</td>
                                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <button className="btn btn-outline btn-info btn-sm" onClick={(e) => { e.stopPropagation(); downloadCV(instructor.cv); }}>
                                                        CV <DownloadIcon fontSize="small" />
                                                    </button>
                                                </td>
                                                <td>
                                                    <div className="flex justify-center gap-3">
                                                        <button className="btn btn-outline btn-success btn-sm" onClick={(e) => { e.stopPropagation(); handleVerify(instructor._id, instructor.email); }}>
                                                            Verify
                                                        </button>
                                                        <button className="btn btn-outline btn-error btn-sm" onClick={(e) => { e.stopPropagation(); handleReject(instructor._id, instructor.email); }}>
                                                            Reject
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </TabPanel>
                    </TabContext>
                </Box>
            </div>
        </>
    );
};
