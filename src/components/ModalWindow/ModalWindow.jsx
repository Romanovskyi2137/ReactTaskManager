import React from "react";
import cl from './ModalWindow.module.css';



function ModalWindow ({children, visible, setVisible}) {
    const rootClasses = [cl.Modal];

    if(visible) {
        rootClasses.push(cl.active);
    }

    return (

                <div className={rootClasses.join(" ")} onClick={() => setVisible()}>
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