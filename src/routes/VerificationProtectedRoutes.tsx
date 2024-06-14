// ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/hooks';
import { RootState } from '@/redux/store';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

export const VerificationProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { data } = useAppSelector((state: RootState) => state.user);

  if (data && data.role === 'instructor' && !data.isVerified) {
    return <Navigate to="/instructor/verification" />;
  }

  return element;
};


