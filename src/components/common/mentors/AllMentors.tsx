import { useAppDispatch } from "@/hooks/hooks";
import { getAllInstructorsAction } from "@/redux/store/actions/user";
import { SignupFormData } from "@/types/IForms";
import React, { useEffect, useState } from "react";
import LoadingPopUp from "../skeleton/LoadingPopUp";
import { SubscriptionCard } from "./SubscriptionCards";
import { InstructorCard } from "./InstructorCard";
import { SkeletonCard } from "./SkeletonCard";

export const AllMentors: React.FC = () => {
  const dispatch = useAppDispatch();
  const [instructors, setInstructors] = useState<SignupFormData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchAllInstructors();
  }, []);

  const fetchAllInstructors = async () => {
    try {
      const response = await dispatch(
        getAllInstructorsAction({ page: 1, limit: 20 })
      );
      const instructor = response.payload.data;
      const verifiedInstructors = instructor.filter(
        (instructor: any) => instructor.isVerified
      );
      setInstructors(verifiedInstructors);
    } catch (error) {
      console.error("Error fetching instructors:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingPopUp isLoading={loading} />;
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 text-center mb-10">
          Our Expert <span className="text-violet-500">Mentors</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {instructors.length <= 0
            ? Array.from({ length: 8 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : instructors.map((instructor) => (
                <InstructorCard key={instructor._id} instructor={instructor} />
              ))}
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 text-center mb-10 mt-20">
          Subscription <span className="text-violet-500">Packages</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <SubscriptionCard
            title="Basic"
            price="₹299/mo"
            description1="Essential features for individuals"
            description2="Essential features for individuals"
            description3="Essential features for individuals"
            index={0}
          />
          <SubscriptionCard
            title="Pro"
            price="₹699/mo"
            description1="Advanced features for professionals"
            description2="Advanced features for professionals"
            description3="Advanced features for professionals"
            isPopular={true}
            index={1}
          />
          <SubscriptionCard
            title="Enterprise"
            price="₹499/mo"
            description1="Full suite for large organizations"
            description2="Full suite for large organizations"
            description3="Full suite for large organizations"
            index={2}
          />
        </div>
      </div>
    </div>
  );
};
