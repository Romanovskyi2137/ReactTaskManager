import React from "react";
import "../css/MenuPage.css"

export default function MenuPage () {
    

    return (
        <div className="menu__wrapper">
            <div className="menu__header">
                <h1 className="menu__header_logo">React task manager</h1>
                <div className="menu__header_avatar">
                    <h3>#</h3>
                </div>
            </div>
            <div className="menu__items">
                <div className="menu__items_item completedTasks">
                    <h2 className="_icon-completed">Виконані</h2>
                </div>
                <div className="menu__items_item todayTasks">
                    <h2 className="_icon-today">Cьогодні</h2>
                </div>
                <div className="menu__items_item urgentlyTasks">
                    <h2 className="_icon-urgently">Термінові</h2>
                </div>
                <div className="menu__items_item allTasks">
                    <h2 className="_icon-all">Всі</h2>  
                </div>
            </div>
            <div className="menu__button_container">
                <button
                    // onClick={}
                    className="createTaskBtn"
                >
                    <h3>Створити задачу</h3>
                </button>
            </div> 

        </div>
    )
};

