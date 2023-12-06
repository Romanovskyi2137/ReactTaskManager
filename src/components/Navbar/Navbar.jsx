import React from "react";
import { NavLink } from "react-router-dom";
import cl from "./Navbar.module.css"

function Navbar () {


    return (
        <div className={cl.navbar_container}>
            <h2>React Task Manager</h2>
            <ul className={cl.navbar_list}>
                <li>
                    <NavLink to="/today">На Сьогодні</NavLink>
                </li>
                <li>
                    <NavLink to="/urgently">Термінові</NavLink>
                </li>
                <li>
                    <NavLink to="/major">Важливі</NavLink>
                </li>
                <li>
                    <NavLink to="/current">Всі поточні</NavLink>
                </li>
                <li>
                    <NavLink to="/completed">Виконані</NavLink>
                </li>
            </ul>
        </div>
    )
};


export default Navbar