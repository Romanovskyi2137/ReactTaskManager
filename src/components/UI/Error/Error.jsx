import React from "react";
import cl from "./Error.module.css";
import { useState } from "react";




function Error (props) {
    const [rootClasses, setRootClasses] = useState([cl.Error])
    const onErrorCloseClick = (e) => {
        setRootClasses([...rootClasses, cl.closed])
    };
    
    return <div 
                className={rootClasses.join(" ")}
                onClick={onErrorCloseClick}
            >
                <div 
                    className={cl.Error_close} 
                >
                    <img src={require("./close.png")} alt={"close"}/>
                </div>
                <div 
                    className={cl.Error_message}
                    onClick={e => e.stopPropagation()}    
                >
                    {props.message}
                </div>
            </div>
};


export default Error