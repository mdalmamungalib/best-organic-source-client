import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const PrivetRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return <span className="loading loading-dots loading-lg"></span>
    }
    if (user && user?.emailVerified === true) {
        return children;
    }
    return (
        <Navigate to="/" state={{ from: location }} replace>
        </Navigate>
    );
};

export default PrivetRoute;