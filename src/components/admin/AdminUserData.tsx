import React from "react";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";

const UserDetailPage: React.FC = () => {
    const location = useLocation();
    const user = location.state?.user[0];

    return (
        <div className="container mx-auto p-6">
            <div className="flex items-center mb-8">
                <div className="w-24 h-24 rounded-full mr-4 overflow-hidden">
                    <img
                        className="object-cover w-full h-full rounded-full"
                        src={user.profile.avatar}
                        alt=""
                    />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-100">
                        {user.firstName} {user.lastName}
                    </h1>
                    <p className="text-gray-600">
                        {user.role} | {user.profession}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="shadow-md rounded-lg p-6 bg-gray-900">
                    <h2 className="text-xl font-bold mb-4 text-violet-300 ">
                        Personal Information
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <p className="text-gray-600 font-bold">
                                Gender:
                            </p>
                            <p className="text-gray-300">
                                {user.profile.gender}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600 font-bold">
                                Date of Birth:
                            </p>
                            <p className="text-gray-300">
                                {format(
                                    new Date(user.profile.dateOfBirth),
                                    "dd MMMM, yyyy"
                                )}
                            </p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-gray-600 font-semibold">
                                Permanent Address:
                            </p>
                            <p className="text-gray-300">
                                {user.contact.address}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="shadow-md rounded-lg p-6 bg-gray-900">
                    <h2 className="text-xl font-semibold mb-4 text-violet-300">
                        Account Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-600 font-semibold">
                                ID:
                            </p>
                            <p className="text-gray-300">{user._id}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 font-semibold">
                                User Name:
                            </p>
                            <p className="text-gray-300">{user.userName}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 font-semibold">
                                Email:
                            </p>
                            <p className="text-gray-300">{user.email}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 font-semibold">
                                First Name:
                            </p>
                            <p className="text-gray-300">{user.firstName}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 font-semibold">
                                Last Name:
                            </p>
                            <p className="text-gray-300">{user.lastName}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="shadow-md rounded-lg p-6 mt-6 bg-gray-900">
                <h2 className="text-xl font-semibold mb-4 text-violet-300">
                    Additional Information
                </h2>
                <div>
                    <p className="text-gray-600 font-semibold">
                        Created At:{" "}
                        <span className="text-gray-300">
                            {format(new Date(user.createdAt), "dd MMMM, yyyy")}
                        </span>
                    </p>
                    <p className="text-gray-600 font-semibold">
                        Google Auth:{" "}
                        <span className="text-gray-300">
                            {user.isGAuth ? "Yes" : "No"}
                        </span>
                    </p>
                    <p className="text-gray-600 font-semibold">
                        Blocked:{" "}
                        <span className="text-gray-300">
                            {user.isBlocked ? "Yes" : "No"}
                        </span>
                    </p>
                    <p className="text-gray-600 font-semibold">
                        Verified:{" "}
                        <span className="text-gray-300">
                            {user.isVerified ? "Yes" : "No"}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserDetailPage;
