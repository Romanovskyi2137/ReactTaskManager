import React from "react";
import backArrow from "./arrow-left-long-solid.svg";
import "./BackToMenu.css";
import { Link } from "react-router-dom";



export default function BackToMenu ({location}) {
    

    return (
        <div className="back__link_a">
            <Link to="/menu">
                <div className="back__container">
                    <img src={backArrow}/>
                    <h3>{location}</h3>
                </div>
            </Link>
        </div>
    )
}