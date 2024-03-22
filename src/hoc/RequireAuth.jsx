import {React} from "react";
import {Navigate, useLocation } from "react-router-dom";
import useToken from "../myHooks/useToken";

export function RequireAuth ({children}) {
    const token = useToken();
    const location = useLocation();
    if (!token) {
        return <Navigate to="/login" state={{from: location}}/>
    };
    return children
};

