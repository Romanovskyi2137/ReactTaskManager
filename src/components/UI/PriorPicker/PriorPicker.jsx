import React, { useEffect, useRef } from "react";

function PriorPicker (props) {
    const iconClassControl = () => {
        const iconBtns = document.querySelectorAll(".chose_prior_btn");
        iconBtns.forEach(btn => {
                if(btn.classList.contains("task_prior_checked")){
                    btn.classList.remove("task_prior_checked")
                }
            }
        )
    };
    useEffect(iconClassControl, [props.visible]);
    const  iOnClick = (e, number, iconClass) => {
        e.stopPropagation();
        props.getPrior({number, iconClass})
        iconClassControl();
        e.target.classList.add("task_prior_checked");
    };
    const prioContainerRef = useRef(null);
    const onMouseOver = (e) => {
        if (window.innerWidth < 890) {
            return
        };
        prioContainerRef.current.style.left = (e.pageX + 10) + 'px';
        prioContainerRef.current.style.top = (e.pageY + 10) + 'px';
        prioContainerRef.current.style.display = "block";
    }
    const onMouseOut = (e) => {
        prioContainerRef.current.style.display = "none"
    }
    return (    
        <div 
            className="prio__container"
            onMouseOver={e => onMouseOver(e)}
            onMouseOut={e => onMouseOut(e)}
        > 
            <div 
                className="prio_tooltip" 
                ref={prioContainerRef} 
            >
                <p>Оберіть пріоритет задачі</p>
            </div>
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
    )
}

export default PriorPicker