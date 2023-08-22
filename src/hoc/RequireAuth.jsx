import React from "react";
import useAuth from "../myHooks/useAuth";
import {Navigate, useLocation } from "react-router-dom";


function RequireAuth ({children}) {
    const from = useLocation();
    const token = useAuth();
    if (!token) {
        return <Navigate to="/auth" state={{location: from}}/>
    };
    return children   
};

export default RequireAuth