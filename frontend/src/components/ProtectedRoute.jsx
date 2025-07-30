/*import { useAuth } from '@context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, user } = useAuth();
    
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    const role = user?.rol || user?.role;
    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/home" />;
    }

    return children;
};

export default ProtectedRoute;
*/

import { useAuth } from '@context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, user } = useAuth();

    console.log("ProtectedRoute usuario:", user);
    const role = user?.rol || user?.role;
    console.log("ProtectedRoute rol:", role);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/home" />;
    }

    return children;
};

export default ProtectedRoute;
