import React, { useState } from 'react';
import "./TaskItem.css"
import TaskTimer from '../UI/TaskTimer/TaskTimer';
import { Notify } from "notiflix";



function TaskItem ({task, taskReplace,}) {
    const TO_CURRENT = "До поточних";
    const TO_COMPLETE = "До виконаних";
    const [buttons, setButtons] = useState({
        replBtn: "",
        delBtn: ""
    });
    const onTaskReplace = async (id) => {
        try {
           await taskReplace(id)
        } catch (e) {
          Notify.failure("Щось пішло не так =(")
        }
      };
    const onTaskDelete = async (id) => {
            try {
                await taskReplace(id)
            } catch (e) {
                console.log(e)
                Notify.failure("Щось пішло не так =(");
            }
        };
    return (
        <div className='task_item__container'>
            <div className="task__item">
                <div className='task_item__content'>
                    <h3>{task.title}</h3>
                    <p>{task.body}</p>
                    <div className='timer_component_container'>
                        {task.endPoint ?
                            <TaskTimer endPoint={task.endPoint}/>
                        :
                            null
                        }
                    </div>
                </div>
                <div className="taskItem__btns">
                    <button onClick={e => onTaskReplace(task.id)}>
                        <div className='taskItem__btn'>
                            <div className={buttons.replBtn}></div>
                        </div>
                    </button>
                    <button onClick={e => onTaskDelete(task.id)}>
                        <div className='taskItem__btn'>
                            <div className={buttons.delBtn}></div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
            )
    
}

export default TaskItem