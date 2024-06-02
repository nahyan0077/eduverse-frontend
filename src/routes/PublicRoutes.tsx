import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';
import { RootState } from '../redux/store';

interface PublicRouteProps  {
  element: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element }) => {
  const { data } = useAppSelector((state: RootState) => state.user);

  return data ? <Navigate to="/" replace /> : element;
};

export default PublicRoute;
