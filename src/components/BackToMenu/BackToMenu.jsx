import React from "react";
import backArrow from "./arrow-left-long-solid.svg";

export default function BackToMenu ({location}) {
    

    return (
        <div>
            <img src={backArrow} style={{height: "15px", width: "20px"}}/>
            <h3>back</h3>
        </div>
    )
}