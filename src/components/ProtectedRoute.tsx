import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp, UserRole } from '../data/store';
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}
export function ProtectedRoute({
  children,
  allowedRoles
}: ProtectedRouteProps) {
  const { currentUser, authReady } = useApp();

  if (!authReady) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}