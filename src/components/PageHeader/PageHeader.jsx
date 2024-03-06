import React, {useState} from "react";
import "./Pageheader.css"
import BackToMenu from "../BackToMenu/BackToMenu";
import TaskFilter from "../TaskFilter";
import Button from "../UI/Button/Button.jsx";
import CreateTaskButton from "../UI/CreateTaskButton/CreateTaskButton.jsx"
import CreateTaskModal from "../CreateTaskModal";
import CompletedTasksModal from "../CompletedTasksModal";


export default function PageHeader ({filter, setFilter, location}) {
    const [CTModalVisible, setCTModalVisible] = useState(false);
    const [completedTaskModalVisible, setCompletedTaskModalVisible] = useState(false);

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
                                onClick={() => setCTModalVisible(true)}
                            />
                            <CreateTaskButton
                                className="createTaskBtn"
                                title="Створити задачу"
                                onClick={() => setCTModalVisible(true)}
                            />
                        </div>
                        <Button
                            onClick={() => setCompletedTaskModalVisible(true)}
                        >
                            Виконані
                        </Button> 
                    </div>
                </div>
            </div>
                {CTModalVisible
                ?
                    <CreateTaskModal 
                    visible={CTModalVisible} 
                    setVisible={setCTModalVisible}
                    />
                :
                    <></>
                }

                {completedTaskModalVisible ?
                    <CompletedTasksModal
                    visible={completedTaskModalVisible}
                    setVisible={setCompletedTaskModalVisible}
                    />
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