import React, {useState} from "react";
import "./Pageheader.css"
import BackToMenu from "../BackToMenu/BackToMenu";
import TaskFilter from "../TaskFilter";
import Button from "../UI/Button/Button.jsx";
import CreateTaskButton from "../UI/CreateTaskButton/CreateTaskButton.jsx"
import CreateTaskModal from "../CreateTaskModal";
import CompletedTasksModal from "../CompletedTasksModal";
import { useDispatch, useSelector } from "react-redux";
import { showCompletedTasksModal, showCreateTaskModal } from "../../store/modalVisibleReducer.js";
import TaskEditModal from "../TaskEditModal.jsx";


export default function PageHeader ({filter, setFilter, location}) {
    const createTaskModalVisible = useSelector(state => state.modalVisible.createTaskModalVisible);
    const completedTasksModalVisible = useSelector(state => state.modalVisible.completedTasksModalVisible);
    const editTaskModalVisible = useSelector(state => state.modalVisible.editTaskModalVisible);
    const dispatch = useDispatch();

    return (
        <div className="PageHeader__container">
            <div className="btn_section">
                <BackToMenu
                    location={location}
                />
                <div className="pageHeader__interactive">
                    <div className='pageHeader__btns'>
                        <div className="create__button_container">
                            <CreateTaskButton
                                className="createTaskBtn_mobile"
                                onClick={() => dispatch(showCreateTaskModal())}
                            />
                            <CreateTaskButton
                                className="createTaskBtn"
                                title="Створити задачу"
                                onClick={() => dispatch(showCreateTaskModal())}
                            />
                        </div>
                        <Button
                            onClick={() => dispatch(showCompletedTasksModal())}
                        >
                            Виконані
                        </Button> 
                    </div>
                </div>
            </div>
            {createTaskModalVisible
                ?
                    <CreateTaskModal/>
                :
                    <></>
            }

            {completedTasksModalVisible 
                ?
                    <CompletedTasksModal/>
                :
                    <></>
            }

            {editTaskModalVisible
                ?
                    <TaskEditModal/>
                :
                    <></>
            }
            <TaskFilter
                filter={filter}
                setFilter={setFilter}
            />
            
        </div>
    )
}