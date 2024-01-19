import React from "react";

export default function CreateTaskButton ({className, title}) {
    

    return (
        <button 
            className={className}
            // onClick={}
        >
            <h3>{title}</h3>
        </button>
    )
}