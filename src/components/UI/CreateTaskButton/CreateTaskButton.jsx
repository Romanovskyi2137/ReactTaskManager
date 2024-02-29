import React from "react";
import icon from "./add_icon.png";
import "./CreateTaskButton.css"

export default function CreateTaskButton ({className, title, ...props}) {
    

    return (
        <button 
            className={className}
            {...props}
        >
            {title
                ?
                <h3>{title}</h3>
                : 
                <img src={icon} alt="add new task"/>
            }
        </button>
    )
}