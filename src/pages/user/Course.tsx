import Header from "@/components/common/users/Header";
import React, { Suspense, lazy } from "react";
import LoadingPopUp from "@/components/common/skeleton/LoadingPopUp";
import Footer from "@/components/common/users/Footer";

const CourseHeader = lazy(() => import("@/components/course/CourseHeader"));
const CoursePage = lazy(() => import("@/components/course/CoursePage"));

export const Course: React.FC = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<LoadingPopUp isLoading />}>
        <CourseHeader />
      </Suspense>
      <Suspense fallback={<LoadingPopUp isLoading />}>
        <CoursePage />
        <Footer />
      </Suspense>
    </>
  );
};
