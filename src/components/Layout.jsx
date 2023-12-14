import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import DataUpdater from "../hoc/DataUpdater";


function Layout () {
    return (
        <>
            <nav>
                <Navbar/>
            </nav>
            <main>

                    <Outlet/>

            </main>
        </>
    )
};



export default Layout