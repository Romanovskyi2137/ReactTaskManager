import React, { useEffect } from "react";

function PriorPicker (props) {
    const iconClassControl = () => {
        const iconBtns = document.querySelectorAll(".chose_prior_btn");
        iconBtns.forEach(btn => {
                if(btn.classList.contains("task_prior_checked")){
                    btn.classList.remove("task_prior_checked")
                }
            }
        )
    }
    const iconDeactive = useEffect(iconClassControl, [props.visible]);

    const  iOnClick = (e, number, iconClass) => {
        e.stopPropagation();
        props.getPrior({number, iconClass})
        

        const iconBtns = document.querySelectorAll(".chose_prior_btn");
        iconClassControl();
        e.target.classList.add("task_prior_checked");
    }
    return (
        <div style={{marginLeft: "10px"}}> 
            <i className="chose_prior_btn fi fi-ss-flame"
                onClick={e => iOnClick(e, "1", e.target.className)}
            />
     
            <i className="chose_prior_btn fi fi-bs-flame" 
                onClick={e => iOnClick(e, "2", e.target.className)}
            />
           
            <i className="chose_prior_btn fi fi-rs-flame"
                onClick={e => iOnClick(e, "3", e.target.className)}
            />
         
        </div>
    )
}

export default PriorPicker