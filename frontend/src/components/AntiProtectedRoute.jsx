import { useAuth } from '@context/AuthContext';
import { Navigate } from 'react-router-dom';

const AntiProtectedRoute = ({ children, bannedRoles }) => {
    const { isAuthenticated, user } = useAuth();
    
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (!(bannedRoles && !bannedRoles.includes(user?.rol))) {
        return <Navigate to="/home" />;
    }

    return children;
};

export default AntiProtectedRoute;
