import React from 'react';
import { Route, Routes } from 'react-router-dom';
import InstructorDashboard from '@/components/instructor/InstructorDashboard';
import InstructorLayout from '@/pages/Instructor/InstructorLayout';
import { InstructorCourses } from '@/components/instructor/InstructorCourses';
import { AddCourse } from '@/components/instructor/course/AddCourse';
import { AddLessons } from '@/components/instructor/course/AddLessons';
import { AddOthers } from '@/components/instructor/course/AddOthers';
import SingleCoursePage from '@/components/instructor/course/SingleCoursePage';
import { InstructorProfile } from '@/components/instructor/InstructorProfile';
import { InstructorVerification } from '@/components/instructor/InstructorVerification';
import { VerificationProtectedRoute } from './VerificationProtectedRoutes';

export const InstructorRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<InstructorLayout />}>
        <Route index element={<VerificationProtectedRoute element={<InstructorDashboard />} />} />
        <Route path="/courses" element={<VerificationProtectedRoute element={<InstructorCourses />} />} />
        <Route path="/add-course" element={<VerificationProtectedRoute element={<AddCourse />} />} />
        <Route path="/add-lessons" element={<VerificationProtectedRoute element={<AddLessons />} />} />
        <Route path="/add-others" element={<VerificationProtectedRoute element={<AddOthers />} />} />
        <Route path="/single-course" element={<VerificationProtectedRoute element={<SingleCoursePage />} />} />
        <Route path="/profile"  element={<InstructorProfile />}  />
        <Route path="/verification" element={<InstructorVerification />} />
      </Route>
    </Routes>
  );
};
