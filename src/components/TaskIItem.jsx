import React from 'react';
import Button from './UI/Button/Button';
import TaskTimer from './UI/TaskTimer/TaskTimer';
import { useDispatch } from 'react-redux';
import { removeCompletedTask, removeCurrentTask, toCurrentReplace, toCompleteReplace } from "../store/tasksReducer";
import { Notify } from "notiflix";
import useToken from "../myHooks/useToken";
import UserService from '../service/userService';


function TaskItem (props) {
    const TO_CURRENT = "До поточних";
    const TO_COMPLETE = "До виконаних";
    const token = useToken();
    const dispatch = useDispatch();
    const onTaskReplace = async (task) => {
        const {id} = task;
        try {
            switch(props.btnType){
                case TO_CURRENT:
                    await UserService.replace(token, id, "to_current");
                    dispatch(toCurrentReplace(task));
                    break
                case TO_COMPLETE:
                    await UserService.replace(token, id, "to_complete");
                    dispatch(toCompleteReplace(task));
                    break
            };
        } catch (e) {
          Notify.failure("Щось пішло не так =(")
        }
      };
    const onTaskDelete = async (task) => {
        const {id} = task;
            try {
                const res = await UserService.delete(token, id);
                switch(props.btnType) {
                case TO_CURRENT: 
                    dispatch(removeCompletedTask(id));
                    break
                case TO_COMPLETE: 
                    dispatch(removeCurrentTask(id))
                    break
                }
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
                    onClick={() => onTaskReplace(props.task)}
                >
                    {props.btnType}
                </Button>  
                <Button 
                    style={{marginTop: "10px"}}
                    onClick={() => onTaskDelete(props.task)}    
                >
                    Видалити
                </Button>
            </div>
         </div>
            )
    
}

export default TaskItem