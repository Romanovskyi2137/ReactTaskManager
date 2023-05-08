import React from "react";
import cl from './CreateTaskModal.module.css';



function CreateTaskModal ({children, visible, setVisible}) {
    const rootClasses = [cl.CTModal]

    if(visible) {
        rootClasses.push(cl.active)
    }

    return (

                <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
                    <div className={cl.CTModalContent} onClick={e => {
                        e.stopPropagation()
                    }}>
                        {children}
                    </div>
                </div>
    )
}

export default CreateTaskModal