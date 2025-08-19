// import { useAuth } from '@/contexts/AuthContext';
// import { Navigate } from 'react-router-dom';

// interface ProtectedRouteProps {
//   children: React.ReactNode;
//   redirectTo?: string;
// }

// export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
//   children, 
//   redirectTo = '/auth' 
// }) => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   if (!user) {
//     return <Navigate to={redirectTo} replace />;
//   }

//   return <>{children}</>;
// };

// new code 
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/auth' 
}) => {
  // Check if token exists in localStorage
  const token = localStorage.getItem('token');

  if (!token) {
    // No token → redirect to login
    return <Navigate to={redirectTo} replace />;
  }

  // Optional: you can also parse user info from localStorage
  // const user = JSON.parse(localStorage.getItem('user') || '{}');
  // if (!user || !user.id) return <Navigate to={redirectTo} replace />;

  return <>{children}</>;
};
