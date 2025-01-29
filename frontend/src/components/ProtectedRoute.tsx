import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { checkAuth } from '../store/slices/authSlice';

const ProtectedRoute = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await dispatch(checkAuth()).unwrap();
      } catch (error) {
        // Don't navigate here, let the render logic handle it
      }
    };
    verifyAuth();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ returnTo: location.pathname }} replace />
  );
};

export default ProtectedRoute;
