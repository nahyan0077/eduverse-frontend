import React from 'react';
import { Route, Routes } from 'react-router-dom';
import InstructorDashboard from '@/components/instructor/InstructorDashboard';
import InstructorLayout from '@/pages/Instructor/InstructorLayout';

export const InstructorRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<InstructorLayout />}>
                <Route index element={<InstructorDashboard />} />
            </Route>
        </Routes>
    );
};

