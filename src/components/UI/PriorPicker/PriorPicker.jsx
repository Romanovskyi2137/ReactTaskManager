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
    useEffect(iconClassControl, [props.visible]);

    const  iOnClick = (e, number, iconClass) => {
        e.stopPropagation();
        props.getPrior({number, iconClass})
        

        const iconBtns = document.querySelectorAll(".chose_prior_btn");
        iconClassControl();
        e.target.classList.add("task_prior_checked");
    }
    return (
        <div className="PriorPicker__wrapper">
            <h4>Виберіть пріорітет:</h4>
            <div className="PriorPicker__container"> 
                <div className="chose_prior_btn _icon-high_prio"
                    onClick={e => iOnClick(e, "1", e.target.className)}
                />
        
                <div className="chose_prior_btn _icon-medium_prio" 
                    onClick={e => iOnClick(e, "2", e.target.className)}
                />
            
                <div className="chose_prior_btn _icon-low_prio"
                    onClick={e => iOnClick(e, "3", e.target.className)}
                />
            
            </div>
        </div>
    )
}

export default PriorPicker