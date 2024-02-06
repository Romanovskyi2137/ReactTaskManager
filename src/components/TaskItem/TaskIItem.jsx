import React from 'react';
import "./TaskItem.css"
import Button from '../UI/Button/Button';
import TaskTimer from '../UI/TaskTimer/TaskTimer';
import { Notify } from "notiflix";



function TaskItem ({task, taskReplace,}) {
    const TO_CURRENT = "До поточних";
    const TO_COMPLETE = "До виконаних";
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
                    <button onClick={onTaskReplace("ID")}>replace</button>
                    <button onClick={onTaskDelete("ID")}>delete</button>
                </div>
            </div>
        </div>
            )
    
}

export default TaskItem