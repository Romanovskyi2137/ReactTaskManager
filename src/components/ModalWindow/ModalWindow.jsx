import React from "react";
import cl from './ModalWindow.module.css';
import { useDispatch } from "react-redux";
import { resetEditTask } from "../../store/taskEditReducer";



function ModalWindow ({children, visible, setVisible}) {
    const rootClasses = [cl.Modal];
    const dispatch = useDispatch();
    if(visible) {
        rootClasses.push(cl.active);
    }

    return (

                <div className={rootClasses.join(" ")} onClick={() => {
                    setVisible(); 
                    dispatch(resetEditTask())
                }}>
                    <div className={cl.Modal__wrapper}>
                        <div className={cl.ModalContent} onClick={e => {
                            e.stopPropagation()
                        }}>
                            {children}
                        </div>
                    </div>
                </div>
    )
}

export default ModalWindow