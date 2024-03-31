import React from "react";
import "../css/MenuPage.css"
import NavElement from "../components/NavElement";
import CreateTaskButton from "../components/UI/CreateTaskButton/CreateTaskButton.jsx";
import CreateTaskModal from "../components/CreateTaskModal";
import { useDispatch, useSelector } from "react-redux";
import { showCreateTaskModal } from "../store/modalVisibleReducer.js";

export default function MenuPage () {
    // const avatar = useState("#");
    const createTaskModalVisible = useSelector(state => state.modalVisible.createTaskModalVisible);
    const dispatch = useDispatch();

    return (
        <div className="menu__wrapper">
            <div className="menu__header">
                <h1 className="menu__header_logo">React task manager</h1>
                {/* <div className="menu__header_avatar">
                    <h3>{avatar}</h3>
                </div> */}
            </div>
            {createTaskModalVisible
                ?
                    <CreateTaskModal/>
                :
                    <></>
            }
            <nav className="menu__items">
                <NavElement
                    className="menu__items_item completedTasks"
                    iconClass="_icon-completed"
                    title="Виконані"
                    navTo="/completed"
                />
                <NavElement
                    className="menu__items_item todayTasks"
                    iconClass="_icon-today"
                    title="Cьогодні"
                    navTo="/today"
                />
                <NavElement
                    className="menu__items_item urgentlyTasks"
                    iconClass="_icon-urgently"
                    title="Термінові"
                    navTo="/urgently"
                />
                <NavElement
                    className="menu__items_item allTasks"
                    iconClass="_icon-all"
                    title="Всі"
                    navTo="/current"
                />
            </nav>
            <div className="menu__button_container">
                <CreateTaskButton
                    className="createTaskBtn_mobile"
                    title=""
                    onClick={() => dispatch(showCreateTaskModal())}
                />
                 <CreateTaskButton
                    className="createTaskBtn"
                    title="Створити задачу"
                    onClick={() => dispatch(showCreateTaskModal())}
                />
            </div> 

        </div>
    )
};

