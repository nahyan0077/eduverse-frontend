import { useAppDispatch } from "@/hooks/hooks";
import { getAllInstructorsAction } from "@/redux/store/actions/user";
import { SignupFormData } from "@/types/IForms";
import React, { useEffect, useState } from "react";

export const AllMentors: React.FC = () => {
    const dispatch = useAppDispatch();
    const [instructors, setInstructors] = useState<SignupFormData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchAllInstructors();
    }, []);

    const fetchAllInstructors = async () => {
        try {
            const response = await dispatch(getAllInstructorsAction({ page: 1, limit: 20 }));
            const instructor = response.payload.data;
            const verifiedInstructors = instructor.filter((instructor: any) => instructor.isVerified);
            setInstructors(verifiedInstructors);
        } catch (error) {
            console.error("Error fetching instructors:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 text-center mb-10">
                    Our Expert <span className="text-violet-500">Mentors</span>
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {instructors.length <= 0  ? (
                        Array.from({ length: 8 }).map((_, index) => (
                            <SkeletonCard key={index} />
                        ))
                    ) : (
                        instructors.map((instructor) => (
                            <InstructorCard key={instructor._id} instructor={instructor} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

const InstructorCard: React.FC<{ instructor: SignupFormData }> = ({ instructor }) => {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden transform transition duration-500 hover:scale-105">
            <div className="h-48 w-full overflow-hidden">
                <img
                    src={instructor?.profile?.avatar || "https://www.pngkey.com/png/detail/72-729716_user-avatar-png-graphic-free-download-icon.png"}
                    alt={`${instructor.firstName} ${instructor.lastName}`}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-6">
                <h2 className="text-md font-semibold dark:text-white text-gray-800 mb-2">{`${instructor.firstName?.toUpperCase()} ${instructor.lastName?.toUpperCase()}`}</h2>
                <p className="text-gray-600 text-sm mb-4">{instructor.role}</p>
                <p className="text-gray-500 text-xs mb-4">{instructor.email}</p>
                <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${instructor.isVerified ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                        {instructor.isVerified ? "Verified" : "Unverified"}
                    </span>
                    <a
                        href={`https://${instructor?.contact?.social}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 transition duration-300"
                    >
                        LinkedIn
                    </a>
                </div>
            </div>
        </div>
    );
};

const SkeletonCard: React.FC = () => {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden animate-pulse">
            <div className="h-48 w-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="p-6">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 mb-4"></div>
                <div className="flex items-center justify-between">
                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700"></div>
                </div>
            </div>
        </div>
    );
};
