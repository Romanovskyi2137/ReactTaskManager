import React from "react";

function PriorPicker (props) {

    const  iOnClick = (e, number, iconClass) => {
        e.stopPropagation();
        
        e.target.classList.add("task_prior_checked");
        props.getPrior({number, iconClass})
    }
    return (
        <div>
            <i className="chose_prior_btn fi fi-ss-flame"
                onClick={e => iOnClick(e, "3", e.target.className)}
            />
     
            <i className="chose_prior_btn fi fi-bs-flame" 
                onClick={e => iOnClick(e, "2", e.target.className)}
            />
           
            <i className="chose_prior_btn fi fi-rs-flame"
                onClick={e => iOnClick(e, "1", e.target.className)}
            />
         
        </div>
    )
}

export default PriorPicker