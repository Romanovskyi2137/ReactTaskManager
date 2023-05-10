import React from "react";
import cl from './Input.module.css';


const Input = (props) => {

        if(props.type === "radio"){
            return <input className={cl.Input__radio} {...props}></input> 
        } else if(props.type === "text"){
            return <input className={cl.Input} {...props}></input>
        }         

}

export default Input