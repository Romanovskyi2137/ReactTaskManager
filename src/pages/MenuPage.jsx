import React from "react";

export default function MenuPage () {
    

    return (
        <div className="menu__wrapper">
            <div className="menu__header">
                <h1>React task manager</h1>
                <div className="menu__header_avatar">
                    <h3>#</h3>
                </div>
            </div>
                <div className="menu__items">
                    <div className="menu__items_item">
                        <h2 className="_icon-completed">Виконані</h2>
                    </div>
                    <div className="menu__items_item">
                        <h2 className="_icon-today">На сьогодні</h2>
                    </div>
                    <div className="menu__items_item">
                        <h2 className="_icon-urgently">Термінові</h2>
                    </div>
                    <div className="menu__items_item">
                        <h2 className="_icon-all">Всі</h2>  
                    </div>
                </div>

        </div>
    )
};

