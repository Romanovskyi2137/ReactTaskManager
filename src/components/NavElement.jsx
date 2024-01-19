import React from "react";
import { Link } from "react-router-dom";


export default function NavElement ({className, iconClass, title, navTo}) {
    

    return (
        <Link
            to={navTo}
        >
            <div
                className={className}
            >
                <h2 className={iconClass}>
                    {title}
                </h2>  
            </div>
        </Link>
    )
}