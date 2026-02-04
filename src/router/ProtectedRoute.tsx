import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';

const ProtectedRoute = () => {
  const { token } = useUserStore();

  if (!token) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
