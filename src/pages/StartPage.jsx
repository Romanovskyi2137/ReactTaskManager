import React, { useEffect, useState } from "react";
import useToken from "../myHooks/useToken";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/StartPage.css"
import UserService from "../service/userService";

function StartPage () {
    const [titleState, setTitleState] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        setTitleState("startpage__h1__visible")
    }, [])
    const token = useToken();
    setTimeout(async () => {

              try {
                const res = await UserService.getToday(token);
                if (res.status === 200) {
                    navigate("/menu")
                }
              } catch (e) {
                if (e.response.status === 400) {
                  navigate("/login", {
                    state: {
                      from: location
                    },
                    replace: true
                  })
                }
              }
    }, 1400)
    return (
        <div className="startpage">
            <h1 className={titleState}>React task manager</h1>
        </div>
    )
};


export default StartPage