import React from 'react';
import Button from './UI/Button/Button';
import TaskTimer from './UI/TaskTimer/TaskTimer';
import { Notify } from "notiflix";



function TaskItem (props) {
    const TO_CURRENT = "До поточних";
    const TO_COMPLETE = "До виконаних";
    const onTaskReplace = async (id) => {
        try {
           await props.taskReplace(id)
        } catch (e) {
          Notify.failure("Щось пішло не так =(")
        }
      };
    const onTaskDelete = async (id) => {
            try {
                await props.taskReplace(id)
            } catch (e) {
                console.log(e)
                Notify.failure("Щось пішло не так =(");
            }
        };
    return (
        <div className="task__item">
            <div style={{maxWidth: "75%"}}>
                <i className={props.task.iconClassName} style={{marginBottom: "10px", marginRight: "20px"}}></i>
                <h3 style={{marginBottom: "12px", display: "inline-block"}}>{props.task.title}</h3>
                <p>{props.task.body}</p>
            </div>
            {props.task.endPoint ?
                <TaskTimer endPoint={props.task.endPoint}/>
            :
                null
            }
            <div className="taskItem__btns">
                <Button
                    onClick={() => onTaskReplace(props.task.id)}
                >
                    {props.btnType}
                </Button>  
                <Button 
                    style={{marginTop: "10px"}}
                    onClick={() => onTaskDelete(props.task.id)}    
                >
                    Видалити
                </Button>
            </div>
         </div>
            )
    
}

export default TaskItem