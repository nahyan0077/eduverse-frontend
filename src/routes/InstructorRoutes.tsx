import React from 'react';
import { Route, Routes } from 'react-router-dom';
import InstructorDashboard from '@/components/instructor/InstructorDashboard';
import InstructorLayout from '@/pages/Instructor/InstructorLayout';
import { InstructorCourses } from '@/components/instructor/InstructorCourses';
import { AddCourse } from '@/components/instructor/course/AddCourse';
import { AddLessons } from '@/components/instructor/course/AddLessons';
import { AddOthers } from '@/components/instructor/course/AddOthers';
import SingleCoursePage from '@/components/instructor/course/SingleCoursePage';

export const InstructorRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<InstructorLayout />}>
                <Route index element={<InstructorDashboard />} />
                <Route path='/courses' element={<InstructorCourses />} />
                <Route path='/add-course' element={<AddCourse />} />
                <Route path='/add-lessons' element={<AddLessons />} />
                <Route path='/add-others' element={<AddOthers />} />
                <Route path='/single-course' element={<SingleCoursePage />} />
            </Route>
        </Routes>
    );
};

