import React from 'react';
import { Route, Routes } from 'react-router-dom';
import InstructorDashboard from '@/components/instructor/InstructorDashboard';
import InstructorLayout from '@/pages/Instructor/InstructorLayout';
import { InstructorCourses } from '@/components/instructor/InstructorCourses';
import { AddCourse } from '@/components/instructor/course/AddCourse';

export const InstructorRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<InstructorLayout />}>
                <Route index element={<InstructorDashboard />} />
                <Route path='/courses' element={<InstructorCourses />} />
                <Route path='/add-course' element={<AddCourse />} />
            </Route>
        </Routes>
    );
};

