import React from "react";


function Button ({children, ...props}) {
    

    return (
        <button className="#" {...props}>
            {children}
        </button>
    )
}


export default Button