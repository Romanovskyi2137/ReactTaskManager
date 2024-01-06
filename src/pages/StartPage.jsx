import React, { useEffect, useState } from "react";
import useToken from "../myHooks/useToken";
import { useNavigate } from "react-router-dom";

function StartPage () {
    const [titleState, setTitleState] = useState("");
    const navigate = useNavigate()
    useEffect(() => {
        setTitleState("startpage__h1__visible")
    }, [])
    const token = useToken();
    setTimeout(() => {
        if(token) {
            // redirect to menu page after timeout
        }
    }, 2000)
    return (
        <div className="startpage">
            <h1 className={titleState}>React task manager</h1>
        </div>
    )
};


export default StartPage