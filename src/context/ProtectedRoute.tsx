// src/components/ProtectedRoute.tsx
import React, { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user, loading } = useAuth();
    // console.log("user---->", user);
    const location = useLocation();

    if (loading) {
      // You can return a spinner or null while loading
      return <div>Loading...</div>;
    }
  
    if (!user) {
      return <Navigate to="/" replace  state={{ from: location }} />;
    }
  
    return children;
  };
  

export default ProtectedRoute;
