import React, { Suspense, useEffect, useState } from "react";
import {Navigate, useLocation, defer,  useLoaderData, Await } from "react-router-dom";
import AuthService from "../service/authService";

const getValid = async () => {
    const token = localStorage.getItem("token");
    const res = await AuthService(token);
    return res
};

export const authLoader = async () => {
    return defer({
        valid: getValid()
    })
}




export function RequireAuth ({children}) {
    const [access, setAccsess] = useState(null);
    const loaderData = useLoaderData();
    loaderData.valid.then(data => console.log(data)).catch(e => console.log(e))
    console.log(loaderData)
    return (
        <div>
            <Suspense fallback={<h1>Loading...</h1>}>
                <Await resolve={loaderData}>
                    {loaderData ? children : <Navigate path="/auth"/>}
                </Await>
            </Suspense>
        </div>
    )

















    // const from = useLocation();
    // const token = useToken();
    // if (!token) {
    //     return <Navigate to="/auth" state={{location: from}}/>
    // };
    // let validToken = null;
    // async function validChecker () {
    //     const response = await AuthService.isValidToken(token);
    //     validToken = response.status
    // }
    // setTimeout(() => {
    //     console.log(validToken)
    //     if (validToken === 200) {
    //         return children
    //     } else {
    //         return <Navigate to="/auth" state={{location: from}}/>
    //     }
    // }, 0)  
};
